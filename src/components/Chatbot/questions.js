import memorizedQuestions from "./memorizedQuestions.json";

function send(request, qContent, qKey) {
    let result;
    if (request === "content") {
        result = qContent
    } else if (request === "key") {
        result = qKey
    }
    return result;
}

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
    moreLikely[0]=removeCounter(moreLikely[0])

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
                            if(wordInInput===wordInMem){
                                counterEqualWords++ // contadoooor
                            }
                        }
                    }
                    resultList.push(counterEqualWords)
                }
                let result = resultList[0] //add validacao
                for(let ii=0;ii<resultList.length;ii++){ //filtra o maior contador
                    if(resultList[ii]>result){
                        result=resultList[ii]
                    }
                }
                partialAnalysis.push([obj.id,result])
            }
        })
    })

    let finalAnalisys // analise final
    if(partialAnalysis.length>1){ //confere se apos analisar a questao, ainda existe um empate
        finalAnalisys = "EMPATE"
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

const questions = {
    compare: (userInput) => {
        let recognizingSomething = []
        let result

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

        console.log(analyzeQuestion(hmmIRemember, userInput)) //envia o que passou na validacao

        return result;
    },





    default: (request) => { //exemplo
        let qContent = []
        let qKey = [] // permite usar 
        return send(request, qContent, qKey)
    },
    all: (request) => { //perguntas
        let qContent = [
            "quais perguntas voce sabe responder",
            "quais perguntas voce conhece",
            "quais perguntas voce consegue responder",
            "o que voce pode responder",
            "o que voce sabe responder",
            "posso perguntar o que",
            "o que eu posso perguntar",
            "voce consegue responder o que",
            "quais as perguntas que voce sabe responder",
            "quais as perguntas que voce consegue responder",


        ]
        let qKey = [
            [
                "voce",
                "consegue",
                "sabe"
            ],
            [
                "perguntas",
                "responder",
                "perguntar"
            ]
        ]
        return send(request, qContent, qKey)
    },
    aboutMe: (request) => {
        let qContent = [
            "me conte sobre voce",
            "gostaria de saber sobre voce",
            "me fale um pouco sobre voce",
            "me fale sobre voce",
            "me conta um pouco sobre de voce",
            "fale sobre voce",
            "conte sobre voce",
            "quero saber sobre voce",
            "gostaria de saber sobre voce",
            "me fale sobre o vinicius",
            "quem e o vinicius",
            "gostaria de saber sobre o vinicius",
            "me fale um pouco sobre o vinicius",
            "me conta um pouco sobre o vinicius",

        ]
        let qKey = [
            " sobre ",
            [
                "voce",
                "vinicius"
            ]
        ]
        return send(request, qContent, qKey)
    },
    pontoForte: (request) => {
        let qContent = [
            "qual seu ponto forte",
            "qual e o seu ponto forte",
            "qual voce considera seu ponto forte",
            "para voce, qual e o seu ponto forte",
            "gostaria de saber seu ponto forte",
            "qual caracteristica vocee considera seu ponto forte",
            "me diz qual e o seu ponto forte",
            "e o seu ponto forte",
            "agora seu ponto forte"
        ]
        let qKey = [
            "ponto",
            "forte"
        ]
        return send(request, qContent, qKey)
    },
    pontoFraco: (request) => {
        let qContent = [
            "qual seu ponto fraco",
            "qual e o seu ponto fraco",
            "qual voce considera seu ponto fraco",
            "para voce, qual e o seu ponto fraco",
            "gostaria de saber seu ponto fraco",
            "qual caracteristica vocee considera seu ponto fraco",
            "me diz qual e o seu ponto fraco",
            "e o seu ponto fraco",
            "agora o seu ponto fraco"
        ]
        let qKey = [
            "ponto",
            "fraco"
        ]
        return send(request, qContent, qKey)
    },
    pretensaoSalarial: (request) => {
        let qContent = [
            "qual a sua pretensao salarial",
            "gostaria de saber sua pretensao salarial",
            "me informe sua pretensao salarial",
            "qual a sua pretensao salarial receber pagamento",
            "qual sua expectativa de salario",
            "gostaria de saber sua expectativa de salario",
            "me informe sua expectativa de salario",

        ]
        let qKey = [
            [
                "pretensao",
                "expectativa"
            ],
            [
                "salarial",
                "salario"
            ]
        ]
        return send(request, qContent, qKey)
    },
    cincoAnos: (request) => {
        let qContent = [
            "onde voce se ve daqui cinco anos",
            "como voce se ve daqui a cinco anos",
            "como voce quer se ver daqui a cinco anos",
            "onde voce quer estar daqui cinco anos",
            "como voce quer ser daqui cinco anos",
            "onde voce quer estar daqui a cinco anos",
            "como voce quer estar daqui a cinco anos",
            "daqui cinco anos voce se ve como"

        ]
        let qKey = [
            "cinco",
            "anos"
        ]
        return send(request, qContent, qKey)
    },
    habilidadesTecnicas: (request) => {
        let qContent = [
            "quais sao suas habilidades tecnicas",
            "me fale sobre suas habilidades tecnicas",
            "gostaria de saber sobre suas habilidades tecnicas",
            "quais suas habilidades tecnicas",
            "agora me fale sobre suas habilidades tecnicas",
            "e suas habilidades tecnicas",

        ]
        let qKey = [
            "habilidades",
            "tecnicas"
        ]
        return send(request, qContent, qKey)
    },
    habilidadesSociais: (request) => {
        let qContent = [
            "me fale sobre suas habilidades sociais",
            "quais sao suas habilidades sociais",
            "gostaria de saber sobre suas habilidades sociais",
            "quais suas habilidades sociais",
            "agora me fale sobre suas habilidades sociais",
            "e suas habilidades sociais",

        ]
        let qKey = [
            "habilidades",
            "sociais"
        ]
        return send(request, qContent, qKey)
    },
    acessoEstacao: (request) => {
        let qContent = [
            "voce possui facil acesso a qual estaçao",
            "voce possui acesso a qual estaçao",
            "voce possui acesso a alguma estaçao",
            "que estaçao voce possui acesso",
            "qual estaçao mais proxima da sua casa",
            "qual estaçao mais proxima da sua residencia",
            "qual estaçao mais proxima de voce",
            "voce esta perto de qual estaçao",
            "qual estaçao mais perto de voce",
            "qual estaçao mais proxima da sua casa",
            "voce esta proximo de qual estaçao",
            "qual estaçao e a mais proxima da sua casa",
            "qual estaçao e a mais proxima da sua residencia",
            "qual estaçao e a mais proxima de voce",
            "voce mora proximo a alguma estaçao",
            "voce mora proximo a qual estaçao",
            "voce mora perto de alguma estaçao",
            "voce mora perto de qual estaçao",
            "onde voce mora",
            "onde voce reside",
            "onde voce e residente",
            "aonde voce mora",
            "qual sua localizaçao",
            "onde voce esta localizado"


        ]
        let qKey = [
            [
                "proxima",
                "perto",
                "proximo",
                "voce"
            ],
            [
                "estaçao",
                "localiza",
                " mora ",
                "reside",
            ]
        ]
        return send(request, qContent, qKey)
    },
    pontoForteFraco: (request) => {
        let qContent = [
            "qual seu ponto forte e fraco",
            "qual e o seu ponto forte e fraco",
            "quais sao seus pontos forte e o seus pontos fraco",
            "qual seu ponto forte e o seu ponto fraco",
            "quais sao os seus pontos forte e fraco",
            "qual voce considera seu ponto forte e ponto fraco",
            "para voce, qual e o seu ponto forte e ponto fraco",
            "gostaria de saber seu ponto forte e ponto fraco",
            "qual caracteristica voce considera seu ponto forte e qual vc considera seu ponto fraco",
            "me diz qual e o seu ponto forte e o seu ponto fraco",
            "me diz qual e o seu ponto forte e fraco",
            "me diz quais sao os seus pontos forte e fraco",
            "e o seus pontos forte e fraco",
            "e o seu ponto forte e fraco",
            "agora seu ponto forte e fraco",
            "agora seus ponto forte e fraco"


        ]
        let qKey = [
            [
                "pontos",
                "ponto",
            ],
            "fraco",
            "forte"
        ]
        return send(request, qContent, qKey)
    },
    habilTecSoc: (request) => { //habiltecsoc
        let qContent = [
            "me fale sobre suas habilidades sociais e tecnicas",
            "quais sao suas habilidades sociais e tecnicas",
            "gostaria de saber sobre suas habilidades sociais e tecnicas",
            "quais suas habilidades sociais e tecnicas",
            "agora me fale sobre suas habilidades sociais e tecnicas",
            "e suas habilidades sociais e tecnicas",
            "me fale sobre suas habilidades",
            "quais sao suas habilidades",
            "gostaria de saber sobre suas habilidades",
            "quais suas habilidades",
            "agora me fale sobre suas habilidades",
            "e suas habilidades",

        ]
        let qKey = [
            "habilidades",
            [
                "sociais",
                "tecnicas",
                "suas"
            ]
        ]
        return send(request, qContent, qKey)
    },
    tempoProgramador: (request) => { //habiltecsoc
        let qContent = [
            "ha quanto tempo voce programa",
            "a quanto tempo voce programa",
            "quanto tempo voce tem de experiencia como programador",
            "quanto anos fazem que voce programa",
            "ha quanto tempo voce estuda programaçao",
            "ha quanto tempo faz que voce estuda programaçao",
            "faz quanto tempo que voce estuda programaçao",
            "faz quanto tempo que voce trabalha com programaçao",
            "faz quanto tempo que voce trabalha com desenvolvimento web",
            "faz quanto tempo que voce estuda desenvolvimento web",
            "ha quanto tempo voce desenvolve para web",
            "quanto anos fazem que voce desenvolve para web",


        ]
        let qKey = [
            "tempo",
            [
                "programaçao",
                "programador",
                "desenvolvimento",
                "desenvolve",
                "experiencia",
                "programa",

            ]
        ]
        return send(request, qContent, qKey)
    },
    meuSigno: (request) => {
        let qContent = [
            "qual seu signo",
            "qual e o seu signo",
            "gostaria de saber seu signo",
            "me fale seu signo",
            "me fale sobre seu signo",
            "voce e de qual signo",
            "voce e de que signo",
            "que signo voce e",
            "e seu signo",
            "gostaria de saber qual e o seu signo",
            "gostaria de saber o seu signo"


        ]
        let qKey = [
            "seu",
            "signo"
        ]
        return send(request, qContent, qKey)
    },
    minhaMotivacao: (request) => {
        let qContent = [
            "o que te motivou a começar a programar",
            "o que te motivou a programar",
            "o que te motivou a estudar programaçao",
            "o que te motivou a se tornar programador",
            "o que fez voce pensar em começar a programar",
            "o que fez voce pensar em estudar programaçao",
            "o que te fez começar a programar",
            "o que te fez começar estudar programaçao",
            "o que te motiva a programar",
            "o que te motiva a estudar",
            "o que te motiva a ser um programador",
            "o que motiva voce a estudar",
            "o que motiva voce a ser um programador",
            "o que motivou voce escolher ser programador",
            "o que te motivou a escolher ser programador",
            "o que motivou voce escolher a area do ti",
            "o que motivou voce escolher o ti",
            "porque voce quer ser um programador",
            "porque voce resolveu se tornar um programador",
            "porque voce entrou na area do ti",
            "porque voce escolheu a area do ti",
            "porque voce escolheu programacao",
            "porque voce escolheu ser programador",
            "porque voce escolheu programar",
            "porque voce escolheu essa area",
            "o que te fez querer entrar no ti",
            "o que te fez querer ser programador",
            "o que te fez querer ser desenvolvedor",
            "o que te fez querer programar",
            "o que te levou escolher a area da programaçao",
            "o que te levou escolher a area do ti",
            "o que te levou escolher programaçao",
            "o que te levou escolher ser programador",
            "o que te fez escolher a area da programaçao",
            "o que te fez escolher a area do ti",
            "o que te fez escolher programaçao",
            "o que te fez escolher ser programador",

        ]
        let qKey = [
            [
                "sua",
                "voce",
                "te",
                "fez"
            ],
            [
                "escolhe",
                "querer",
                "estudar",
                "motiv",

            ]
        ]
        return send(request, qContent, qKey)
    },
    situaçaoDificil: (request) => {
        let qContent = [


        ]
        let qKey = [
            [
                "qual",
                "fale",
                "conte"
            ],
            [
                "dificil",
                "desafio",
                "situaçao"

            ]
        ]
        return send(request, qContent, qKey)
    },
    minhasRealizaçoes: (request) => {
        let qContent = [
            "fale sobre sua maior realizaçao no trabalho",
            "fale sobre sua maior realizaçao",
            "fale sobre sua maior conquista no trabalho",
            "fale sobre sua maior conquista",
            "gostaria de saber sobre alguma realizaçao sua no trabalho",
            "gostaria de saber sobre alguma realizaçao sua",
            "me conte sobre alguma realizaçao sua no trabalho",
            "me conte sobre alguma realizaçao sua",
            "me conte sobre alguma conquista sua no trabalho",
            "me conte sobre alguma conquista sua",
            "me conte sobre sua maior realizaçao no trabalho",
            "me conte sobre sua maior realizaçao",
            "me conte sobre sua maior conquista no trabalho",
            "me conte sobre sua maior conquista",
            "me fale sobre suas realizações profissionais",
            "me fale sobre suas realizações no trabalho",
            "me fale sobre suas realizações",
            "gostaria de saber sobre suas realizações profissionais",
            "gostaria de saber sobre suas realizações no trabalho",
            "gostaria de saber sobre suas realizações",
            "me conte sobre suas realizações profissionais",
            "me conte sobre suas realizações no trabalho",
            "me conte sobre suas realizações",






        ]
        let qKey = [
            [
                "qual",
                "conte",
                "fale",
            ],
            [
                "realizaçoes",
                "realizaçao",
                "conquista",
            ]
        ]
        return send(request, qContent, qKey)
    },

}

export default questions;