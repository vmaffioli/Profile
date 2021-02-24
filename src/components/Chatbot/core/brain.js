import memory from "./memory.json";
import sameWords from "./sameWords.json";
import Memorize from "./memorize";



function preventStutter(word) { //pra evitar que os proximos resultados nao saim embaralhados
    return " " + word + " "
}


function normalizeCustom(str){
    let mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g
    };
    for (let letra in mapaAcentosHex) { //retira acentos
        let expressaoRegular = mapaAcentosHex[letra]
        str = str.replace(expressaoRegular, letra)
    }
    return str
}
function padronizeWords(userInput) {     // girias ou variacoes 
    userInput = userInput.toLowerCase()
    let sameWords_in = sameWords[0]
    let sameWords_out = sameWords[1]

    for (let i = 0; i < sameWords_in.length; i++) {
        userInput = normalizeCustom(preventStutter(userInput).replace(preventStutter(sameWords_in[i]), preventStutter(sameWords_out[i])))
    } //converte palavras com significados iguais aos memorizados

 
    return userInput //entrega com as palavras com significados iguais convertidas para palavra padrao
}



function rememberQuestions(json) { //retorna perguntas memorizadas
    let result = [];
    let keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });

    return result
}

function buildStringWithCounter(str, numbers) { //monta string com counter
    if ((numbers >= 0) || (numbers <= 99)) {
        numbers = "00" + numbers
    } else if ((numbers > 9) || (numbers <= 99)) {
        numbers = "0" + numbers
    } else if ((numbers > 99) || (numbers <= 999)) {
        numbers = toString(numbers)
    } else {
        numbers = "ERR"
    }
    let result = str + numbers
    return result
}

function searchByCounter(str) { //procura se string prossui contador true false
    let prefix = "%%"
    let newString = str.substring(str.length - 5, str.length - 3)
    let result = false
    if (newString === prefix) {
        result = true
    }
    return result
}

function removeCounter(str) { //remove contador da string para comparações - add validacao
    return str.substring(0, str.length - 5)
}

function getCounter(str) { //add validacao
    return parseInt(str.substring(str.length - 3, str.length))
}

function thinkingAboutKeys(array) { // filtra chaves reconhecidas pelo maior contador informado pela AnalyzeKeys (independente de quantas keys forem)
    let memoryCache // para futuras implementacoes tb 
    let moreLikely

    if (array.length === 0) {
        moreLikely = ["%%dontknow%%"]
    } else {
        for (let i = 0; i < array.length; i++) { //filtra os contadores
            if (memoryCache) {
                if (getCounter(array[i]) >= getCounter(memoryCache[0])) {
                    memoryCache.unshift(array[i])
                } else {
                    memoryCache.push(array[i])
                }
            } else {
                memoryCache = []
                memoryCache.unshift(array[i])
            }
        } //para proximas ideias no reconhecimento
        //console.log(memoryCache)

        moreLikely = [memoryCache[0]] // filtra cache com o maior(ou maiores iguais) contador(res)  -- add validacao
        for (let i = 1; i < memoryCache.length; i++) {
            if (getCounter(memoryCache[i]) === getCounter(moreLikely[0])) {
                moreLikely.push(removeCounter(memoryCache[i]))
            }
        }
        moreLikely[0] = removeCounter(moreLikely[0])
    }
    return [moreLikely, memoryCache]
}

function analyzeQuestion(hmmIRemember, userInput) { //dividido em parcial e final/ compara as palavras do input com as questoes memorizadas
    let partialAnalysis = [] //analise parcial
    userInput = padronizeWords(userInput.toLowerCase())
    console.log(userInput)
    if (hmmIRemember[0] === "%%dontknow%%") { // converte o nao reconhecido em nao lembrado rs
        partialAnalysis.push(hmmIRemember)
    }
    hmmIRemember.forEach(itemRemembered => { //verifica tudo q ele lembrou ao ler o que o usuario perguntou
        rememberQuestions(memory).forEach(obj => { //carrega cada objetos do json
            if (obj.id === itemRemembered) { //compara cada palavra do input com da pergunta gravada na memoria
                let memorizedQuestion = obj.questions
                let resultList = []
                for (let i = 0; i < memorizedQuestion.length; i++) { //divide frases em palavras
                    let splitedMemQuestion = memorizedQuestion[i].split(" ")
                    let splitedInputUser = userInput.split(" ")
                    let counterEqualWords = 0

                    for (let ii = 0; ii < splitedMemQuestion.length; ii++) { //compara as palavras
                        const wordInMem = splitedMemQuestion[ii]
                        for (let iii = 0; iii < splitedInputUser.length; iii++) {
                            const wordInInput = splitedInputUser[iii]
                            if (wordInInput === wordInMem) {
                                counterEqualWords++ // contadoooor
                            }
                        }
                    }
                    let percentualResult = Math.floor(counterEqualWords / splitedMemQuestion.length * 100)
                    resultList.push(percentualResult)
                }
                let result = resultList[0] //add validacao
                for (let ii = 0; ii < resultList.length; ii++) { //filtra o maior contador
                    if (resultList[ii] > result) {
                        result = resultList[ii]
                    }
                }
                partialAnalysis.push([obj.id, result])
            }
        })
    })
    let finalAnalisys // analise final
    let cache = []

    if (partialAnalysis.length > 1) { //confere se apos analisar a questao se ainda existe um empate
        //finalAnalisys.push("%%draw%%") //seta aqui o prefixo para responder empate

        for (let i = 0; i < partialAnalysis.length; i++) {
            if (i === 0) {
                cache.push(partialAnalysis[i])
            } else {
                if (partialAnalysis[i][1] > cache[0][1]) {
                    finalAnalisys = partialAnalysis[i][0]
                } else if (partialAnalysis[i][1] === cache[0][1]) {
                    finalAnalisys = ["%%draw%%"]
                    for (let ii = 0; ii < partialAnalysis.length; ii++) {
                        finalAnalisys.push(partialAnalysis[i][0])
                    }
                }
            }

        }

    } else {
        finalAnalisys = partialAnalysis[0][0]
    }

    return finalAnalisys
}

function analyzeKeys(recognizingSomething) { //analisa lista de keys reconhecidas - para futuras implementações
    let thingsList = []
    let alreadyRecognized = false

    for (let i = 0; i < recognizingSomething.length; i++) {//separa os itens reconhecidos
        const itemRecognized = recognizingSomething[i]

        for (let ii = 0; ii < thingsList.length; ii++) { //separa os itens memorizados
            const itemMemorized = thingsList[ii]

            if (itemMemorized === itemRecognized) { //compara
                alreadyRecognized = true
            } else {

                if (searchByCounter(itemMemorized)) {

                    if (removeCounter(itemMemorized) === itemRecognized) {
                        alreadyRecognized = true
                    }
                }
            }
        }
        let prefixCounter = "%%"
        let counter = 0
        if (alreadyRecognized) {
            for (let ii = 0; ii < thingsList.length; ii++) {
                let thing = thingsList[ii]

                if (removeCounter(thing) === itemRecognized) {
                    counter++
                    let numbers = parseInt(thing.substring(thing.length - 3, thing.length)) + 1
                    thingsList[ii] = buildStringWithCounter(thingsList[ii].substring(0, thing.length - 3), numbers)

                } else if (thing === itemRecognized) {
                    thingsList[ii] = buildStringWithCounter(thingsList[ii] + prefixCounter, counter)

                }
            }
        } else {
            counter++
            thingsList.push(buildStringWithCounter(itemRecognized + prefixCounter, counter))
        }
    }

    return thingsList
}

function getAnswersById(id, userInput) { // retorna respostas do json pelo id da pergunta
    let result = []

    if (Array.isArray(id)) { // em caso de empate ele recebe mais de 1 lista, entao ele processa a resposta para empate aqui
        for (let i = 0; i < id.length; i++) {
            const eachId = id[i]
            for (let ii = 0; ii < memory.length; ii++) {
                const memorizedId = memory[ii].id
                if (result[0] === undefined) {
                    result.push("Eu não entendi muito bem a sua pergunta")
                    result.push("Você quis dizer alguns dos temas abaixo?")
                } else if ((result[0] !== undefined) && (memorizedId === eachId)) {
                    result.push(memory[ii].desc)
                }
                if (ii === memory) {
                    result.push("Caso seja algum desses, me diga qual")
                    result.push("Se não for, tente refazer a pergunta usando outras palavras")
                }
            }
        }
    } else if (id === "%%dontknow%%") { // se nao reconhecer nenhuma chave, nada!
        
       //salva no banco de dados a pergunta desconhecida
        Memorize.save(userInput,"notAnswered")

        result.push("Essa pergunta eu não conheço =(")
        result.push("Vou anotar e pedir pro Vinícius original me ensinar a responder")

    } else { //se souber e for somente 1 item,  caso limpo
        for (let i = 0; i < memory.length; i++) {
            const memorizedId = memory[i].id
            if (memorizedId === id) {
                result = memory[i].answers
            }
        }
       //salva o que consegue responder
       Memorize.save(userInput,"answered")

    }

    return result
}

function compareWords(userInput, memorizedWord) { //compara palavras - so strings por enquanto
    let result = false
    if (userInput.includes(memorizedWord)) {
        result = true
    }
    return result
}

const analyzeInput = {
    
    reply: (userInput) => {
        let recognizingSomething = []
        userInput = padronizeWords(userInput) // aplica padrao para palavras com msm significado

        rememberQuestions(memory).forEach(memorizedQuestion => { //verifica se cada key existe no userInput
            let keys = memorizedQuestion.keys
            let passedCounter = 0
            let twoFactory_1 = false //validar as 2 keys
            let twoFactory_2 = false
            if (Array.isArray(keys)) { // precisa receber uma lista - é regra
                for (let i = 0; i < keys.length; i++) { //compara palavras vindas do usuarios com as keys
                    if (Array.isArray(keys[i])) {
                        let checkKeys = keys[i]
                        for (let ii = 0; ii < checkKeys.length; ii++) {
                            if ((passedCounter === 0) && (compareWords(userInput, checkKeys[ii]))) {
                                twoFactory_2 = true
                            } else if ((passedCounter === 1) && (compareWords(userInput, checkKeys[ii]))) {
                                twoFactory_1 = true
                            } else if (passedCounter > 1) {
                                console.log("hey, estão me enviando chave a mais para analisar!! so pode 2 mininuuu")
                            }
                        }
                    } else {
                        if ((passedCounter === 0) && (compareWords(userInput, keys[i]))) {
                            twoFactory_2 = true
                        } else if ((passedCounter === 1) && (compareWords(userInput, keys[i]))) {
                            twoFactory_1 = true
                        } else if (passedCounter > 1) { //precisa vir uma lista de keys com 2 posicoes - a regra é clara!
                            console.log("Receiving an invalid keys list!")
                        }
                    }

                    if ((twoFactory_1) && (twoFactory_2)) {
                        recognizingSomething.push(memorizedQuestion.id)
                    }
                    passedCounter++
                }
            } else {//precisa vir uma lista de keys com 2 posicoes  - a regra é clara!
                console.log("Receiving an invalid keys list!")
                //recognizingSomething.push(memorizedQuestion.id)
            }
        })
        const myBrainIsArching = thinkingAboutKeys(analyzeKeys(recognizingSomething))//analisa as keys identificadas e processa qual delas foi a mais acessada 
        //const keyCompareCache = myBrainIsArching[1]//para futuras atualizacoes
        const hmmIRemember = myBrainIsArching[0]




        //envia a resposta ja validada pelo analyzeQuestion
        return getAnswersById(analyzeQuestion(hmmIRemember, userInput), userInput.trim()) //gambiarra para armazenar perguntas desconhecidas --arrumar depois
    }

}

export default analyzeInput;