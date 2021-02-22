//modelo com suporte de frases aleatorias dentro do contexto

function randomize(array) {
    let rand = Math.floor(Math.random() * array.length);

    if (rand === array.length) { rand = 0 };
    return array[rand]
};



const messages = {
    default: () => { //example 
        let msg = [
            ""
        ]
        return randomize(msg);
    },
    default2: (param) => { // example with name
        let msg
        if (param === "$$IsaFalse%%") {
            let msgWithoutName = []
            msg = msgWithoutName
        } else {
            let msgWithName = []
            msg = msgWithName
        }
        return randomize(msg)
    },
    presentation_init: () => {
        let msg = [
            "Olá! Me chamo Vinibot e estou aqui para responder as perguntas mais frequentes durante entrevistas de emprego.",
            "Oi, tudo bem? Eu sou o Vinibot e estou aqui para ajuda-lo(a), fui programado para responder as perguntas mais comuns em entrevistas de emprego.",
            "Olá, tudo bem com você? Meu nome é Vinibot e estou aqui para responder perguntas comuns durante entrevistas de emprego. "
        ]
        return randomize(msg);
    },
    askName_init: () => {
        let msg = [
            "Qual o seu nome?",
            "Como você se chama?",

        ]
        return randomize(msg);
    },
    askName_finish: (param) => {
        let msg

        if (param === "$$IsaFalse%%") {
            let msgWithoutName = [
                "Muito prazer em te conhecer!",
                "É um prazer te conhecer!",
                "É um imenso prazer te conhecer!",
            ]
            msg = msgWithoutName
        } else {
            let msgWithName = [
                "Muito prazer em te conhecer!",
                "É um prazer te conhecer!",
                "É um imenso prazer te conhecer!",
            ]
            msg = msgWithName
        }

        return randomize(msg);
    },
    presentation_finish: (param) => {
        let msg
        if (param === "$$IsaFalse%%") {
            let msgWithoutName = [
                "O que deseja perguntar?",
                "O que você gostaria de perguntar?",
                "Vamos começar? qual a sua primeira pergunta?"
            ]
            msg = msgWithoutName
        } else {
            let msgWithName = [
                param + ", o que deseja perguntar?",
                "O que você gostaria de perguntar, " + param + "?",
                "Vamos começar? qual a sua primeira pergunta, " + param + "?"
            ]
            msg = msgWithName
        }
        return randomize(msg);
    },






}

export default messages;