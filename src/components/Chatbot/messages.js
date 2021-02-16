
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
    all_1: () => {
        let msg = [
            "Perguntas ou assuntos que sei responder:",
        ]
        return randomize(msg);
    },
    all_2: () => {
        let msg = [
            "Sei falar sobre mim, sobre meu ponto forte ou ponto fraco, pretensão salarial, como me vejo daqui 5 anos",
        ]
        return randomize(msg);
    },
    all_3: () => {
        let msg = [
            "sobre minhas habilidades técnicas/hardSkills, habilidades sociais/softSkills, meu acesso a estações de trem/metrô",
        ]
        return randomize(msg);
    },
    dont_know: () => {
        let msg = [
            "Eu não conheço essa pergunta, me desculpa! Eu ainda não reconheço erros gramaticais (como acentos por exemplo), por favor revise a pergunta ou digite 'quais perguntas você sabe responder'."
        ]
        return randomize(msg);
    },
    q01_1: (param) => { //sobre
        let msg = [
            "Me chamo Vinícius, tenho 27 anos e possuo 2 anos de experiência com programação em geral."
        ]
        return randomize(msg);
    },
    q01_2: (param) => {
        let msg = [
            "Desses 2 anos, tenho como experiência profissional 1 ano de estágio em desenvolvimento Java/Sql pela BRQ."
        ]
        return randomize(msg);
    },
    q01_3: (param) => {
        let msg = [
            "Amo programar, sou autodidata e possuo um plano de estudos diário, onde atualmente me dedico a javascript (Node,react e bancos noSQL como Firebase) ."
        ]
        return randomize(msg);
    },
    q02_1: (param) => { //forte
        let msg = [
            "Minha persistência, não desisto de resolver ou enfrentar situações desafiadoras"
        ]
        return randomize(msg);
    },
    q02_2: (param) => { //forte
        let msg = [
            "Seja um bug, algum aprendizado complexo ou situação que exijam mudanças repentinas."
        ]
        return randomize(msg);
    },
    q03_1: (param) => { //fraco
        let msg = [
            "Ansiedade"
        ]
        return randomize(msg);
    },
    q03_2: (param) => { //fraco
        let msg = [
            "Eu me cobro muito e as vezes preciso lidar com as frustrações, é um ponto que estou trabalhando."
        ]
        return randomize(msg);
    },
    q04_1: (param) => { //pretensao
        let msg = [
            "Minha pretensão é de 2500"
        ]
        return randomize(msg);
    },
    q04_2: (param) => { //pretensao
        let msg = [
            "Porém estou totalmente aberto a negociações."
        ]
        return randomize(msg);
    },
    q05_1: (param) => { //5anos
        let msg = [
            "hmm..daqui cinco anos?"
        ]
        return randomize(msg);
    },
    q05_2: (param) => { //5anos
        let msg = [
            "Quero estar a frente de projetos e ideias inovadoras"
        ]
        return randomize(msg);
    },
    q05_3: (param) => { //5anos
        let msg = [
            "vou carregar comigo a vontade de aprender e continuar avançando para ter autonomia de criação."
        ]
        return randomize(msg);
    },
    q06_1: () => { //habilidades tecnicas 
        let msg = [
            "Minhas principais habilidades são desenvolvimento back-end Java e Nodejs"
        ]
        return randomize(msg);
    },
    q06_2: () => { 
        let msg = [
            "Fiz estágio em desenvolvimento de sistemas e participei de projetos bacanas em Java/SQL que me deram boa noções iniciais em projetos grandes"
        ]
        return randomize(msg);
    },
    q06_3: () => { 
        let msg = [
            "Depois dessa experiência continuei estudando, me aprofundei um pouco mais em JavaScript, Nodejs e ReactJs (Esta página é um exemplo o/)"
        ]
        return randomize(msg);
    },
    q06_4: () => { 
        let msg = [
            "Listando temos: Java/Spring, JS/Nodejs, Reactjs, SQL/mySQL, noSQL/Firebase-realTimeDatabase"
        ]
        return randomize(msg);
    },
    q07_1: () => {  // habilidades sociais
        let msg = [
            "Com frequência exerço habilidades comunicativas, de positividade e enfrentamento."
        ]
        return randomize(msg);
    },
    q07_2: () => { 
        let msg = [
            "Gosto de trocar conhecimento, seja em conversas casuais ou buscando soluções "
        ]
        return randomize(msg);
    },
    q07_3: () => { 
        let msg = [
            "Procuro utilizar da boa apresentação e otimismo como posicionamento inicial para ideias ou participações."
        ]
        return randomize(msg);
        },
    q08_1: () => {  //acesso estacoes
        let msg = [
            "Estou próximo as estações Quitaúna e Comandante Sampaio da linha Diamante da CPTM.",
        ]
        return randomize(msg);
    },
    q08_2: () => { 
        let msg = [
            "Até a Barra Funda por exemplo levo em torno de 25 minutos contando com o percurso até a estação."
        ]
        return randomize(msg);
    },

    



}

export default messages;