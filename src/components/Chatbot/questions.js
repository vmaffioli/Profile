import memorizedQuestions from "./memorizedQuestions.json";



function preventStutter(word) { //pra evitar que os proximos resultados nao saim embaralhados
    return " " + word + " "
}

function sameWords(userInput) { //jsonificar isso aquiiiii
    // girias ou variacoes 
    let sameWords_in = [
        "vc",
        "tu",
        "q",
        "o q",
        "oq",
        "5",
        "estacao",
        "de trem",
        "de metro",
        "fracos",
        "fortes",
        "por que",
        "pq",
        "programacao",
        "situacao",
        "fala",
        "conta",
        "realizacoes",
        "realizacao",
        "conquistas",
        "localizacao"

    ]
    let sameWords_out = [
        "voce",
        "voce",
        "que",
        "o que",
        "o que",
        "cinco",
        "estaçao",
        "",
        "",
        "fraco",
        "forte",
        "porque",
        "porque",
        "programaçao",
        "situaçao",
        "fale",
        "conte",
        "realizaçoes",
        "realizaçao",
        "conquista",
        "localizaçao"


    ]
    for (let i = 0; i < sameWords_in.length; i++) {
        userInput = preventStutter(userInput).replace(preventStutter(sameWords_in[i]), preventStutter(sameWords_out[i]))
    } //converte palavras com significados iguais aos memorizados

    return userInput //entrega com as palavras com significados iguais convertidas para palavra padrao
}

function chewInput(string) { //mastiga input deixando mais facil de entender
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
        string = string.replace(expressaoRegular, letra)
    }
    return sameWords(string) // entrega com padrao aplicado em palavras com mesmo significado utilizadas
}

function splitCustom(string) { //split sem posicoes vazias
    let result = []
    string.split(" ").forEach(element => {
        if (element.length > 0) {
            result.push(element)
        }
    })

    return result
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
    let memoryCache
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

    let moreLikely = [memoryCache[0]] // filtra cache com o maior(ou maiores iguais) contador(res)  -- add validacao
    for (let i = 1; i < memoryCache.length; i++) {
        if (getCounter(memoryCache[i]) === getCounter(moreLikely[0])) {
            moreLikely.push(removeCounter(memoryCache[i]))
        }
    }
    moreLikely[0] = removeCounter(moreLikely[0])

    return [moreLikely, memoryCache]
}

function analyzeQuestion(hmmIRemember, userInput) { //dividido em parcial e final/ compara as palavras do input com as questoes memorizadas
    let partialAnalysis = [] //analise parcial

    hmmIRemember.forEach(itemRemembered => {

        rememberQuestions(memorizedQuestions).forEach(obj => { //carrega cada objetos do json

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
                    resultList.push(counterEqualWords)
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
    if (partialAnalysis.length > 1) { //confere se apos analisar a questao, ainda existe um empate
        finalAnalisys = []
        finalAnalisys.push("%%dontknow%%")

        
        for(let i=0;i<partialAnalysis.length;i++){
            if(i===0){
                finalAnalisys.push(partialAnalysis[i][0])
            } else if ((i>0)||(partialAnalysis[i][1]===finalAnalisys[i-1][0])){
                finalAnalisys.push(partialAnalysis[i][0])
            }
        }

    } else {
        finalAnalisys = partialAnalysis[0][0]
    }

    return finalAnalisys
}

function analyzeKeys(recognizingSomething) { //analisa lista de keys reconhecidas
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

function getAnswersById(id) { // retorna respostas do json pelo id da pergunta
    let result

    if(Array.isArray(id)){ // se nao souber responder - novo
        result = []
        for(let i=0;i<id.length;i++){
            const eachId = id[i]

            for (let ii = 0; ii < memorizedQuestions.length; ii++) {
                const memorizedId = memorizedQuestions[ii].id

                if(result[0] === undefined ){ 
                    result.push("Eu não entendi muito bem a sua pergunta") 
                    result.push("Você quis dizer alguns dos temas abaixo?") 
                }
                if (memorizedId === eachId) {
                    result.push(memorizedQuestions[ii].desc)
                }
            }

        }

    } else {
        if (id === "%%dontknow%%") { // se nao souber responder - antigo
            result = [id]
    
        } else { //se souber
            for (let i = 0; i < memorizedQuestions.length; i++) {
                const memorizedId = memorizedQuestions[i].id
                if (memorizedId === id) {
                    result = memorizedQuestions[i].answers
                }
            }
        }
    }


    return result
}

const questions = {
    compare: (userInput) => {
        let recognizingSomething = []

        function compareWords(userInput, memorizedWord, memorizedQuestion) { //compara palavras
            if (userInput === memorizedWord) {
                recognizingSomething.push(memorizedQuestion.id)

            }
        }

        //mastiga a pergunta para entender mais facil && desmembra a pergunta para procurar pelos gatilhos de comparação(keys)
        splitCustom(chewInput(userInput).toLowerCase()).forEach(wordInUserInput => {
            rememberQuestions(memorizedQuestions).forEach(memorizedQuestion => {
                let keys = memorizedQuestion.keys

                if (typeof (keys) === "object") { //compara palavras vindas do usuarios com as keys
                    for (let i = 0; i < keys.length; i++) {
                        if (typeof (keys[i]) === "object") {
                            let checkKeys = keys[i]
                            for (let ii = 0; ii < checkKeys.length; ii++) {
                                compareWords(wordInUserInput, checkKeys[ii], memorizedQuestion)
                            }
                        } else {
                            compareWords(wordInUserInput, keys[i], memorizedQuestion)
                        }
                    }
                } else {
                    compareWords(wordInUserInput, keys, memorizedQuestion)
                }
            })
        })
        const myBrainIsArching = thinkingAboutKeys(analyzeKeys(recognizingSomething))//analisa as keys identificadas e processa qual delas foi a mais acessada 
        //const keyCompareCache = myBrainIsArching[1]//para futuras atualizacoes
        const hmmIRemember = myBrainIsArching[0]

        //envia a resposta ja validada pelo analyze question
        //console.log(getAnswersById(analyzeQuestion(hmmIRemember, userInput)))
        return getAnswersById(analyzeQuestion(hmmIRemember, userInput))
    }







}

export default questions;