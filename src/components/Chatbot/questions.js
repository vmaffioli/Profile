

function send(request, qContent, qKey) {
    let result;
    if (request === "content") {
        result = qContent
    } else if (request === "key") {
        result = qKey
    }
    return result;
}




const questions = {
    compare: (question, key, qIn) => {
        let bool = false;
        let innerBool = false;
        let result = false;

        // girias ou variacoes 
        let sameWords_in = [
            "vc",
            "q",
            "oq",
            "5",
            "estacao",
            "estaçao de trem",
            "estaçao de metro",
            "skills",
            "hard",
            "soft",
        ]
        let sameWords_out = [
            "voce",
            "que",
            "o que",
            "cinco",
            "estaçao",
            "estaçao",
            "estaçao",
            "habilidades",
            "tecnicas",
            "sociais"
        ]

        for (let i=0;i<sameWords_in.length;i++){
            qIn = qIn.replace(sameWords_in[i], sameWords_out[i])

        }


        key.forEach(e => {
            if (Array.isArray(e)) { 
                e.forEach(element => {
                    if (qIn.includes(element)) {
                        innerBool = true
                    }
                });
                if (innerBool) {
                    bool = true
                } else {
                    bool = false
                }
            } else {
                if (qIn.includes(e)) {
                    bool = true
                } else {
                    bool = false
                }
            }
        })
        if (bool) {
            question.forEach(eachQ => { //desmontando a pergunta memorizada
                eachQ = eachQ.split(" ")
                let eqct = 0;
                eachQ.forEach(e => {
                    if (qIn.includes(e)) {
                        eqct++
                    }
                })
                let iQIn = qIn.split(" ")
                let calc = 70 / 100 * iQIn.length
                if (eqct >= calc) {
                    result = true
                }
            })
        }
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
            "posso perguntar o que",
            "o que eu posso perguntar",
            "voce consegue responder o que",
            "quais as perguntas que voce sabe responder",
            "quais as perguntas que voce consegue responder",

            
        ]
        let qKey = [
            [
                "voce",
                "consegue"
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
            "sobre",
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
            "que estaçao voce possui acesso",
            "qual estaçao mais proxima da sua casa",
            "qual estaçao mais proxima da sua residencia",
            "qual estaçao mais proxima de voce",
            "voce esta perto de qual estaçao",
            "qual estaçao mais proxima da sua casa",
            "voce esta proximo de qual estaçao"

        ]
        let qKey = [
            [
                "acesso",
                "proxima",
                "perto",
                "proximo"
            ],
            "estaçao"
        ]
        return send(request, qContent, qKey)
    },

}

export default questions;