

function send(request,qContent,qKey){
    let result;
    if(request==="content"){
        result=qContent
    } else if(request==="key"){
        result=qKey
    }            
    return result;
}




const questions = {
    compare: (question,key,qIn) => { 
        let bool = false;
        let result = false;
 
    
        key.forEach(e =>{
          if(qIn.includes(e)){
            bool=true
          } else {
            bool=false
          }
        })
        if(bool){
          question.forEach(eachQ => {
            eachQ = eachQ.split(" ")
            let eqct = 0;
    
            eachQ.forEach(e => {
              if(qIn.includes(e)){
                eqct++
              }
            })
            let iQIn = qIn.split(" ")
            let calc = 70 / 100 * iQIn.length
    
            if(eqct>=calc){
              result=true
            }
          })
        }
        return result;
    },
    default: (request) => { //example
        let qContent = []
        let qKey = []
        return send(request,qContent,qKey)
    },
    all: (request) => { //perguntas
        let qContent = [
            "quais perguntas voce sabe responder ?",
            "quais perguntas voce conhece ?",
            "quais perguntas voce consegue responder ?",
          
        ]
        let qKey = [
            "voce",
            "perguntas"
        ]
        return send(request,qContent,qKey)
    },
    aboutMe: (request) => {
        let qContent = [
            "me conte sobre voce",
            "gostaria de saber sobre voce",
            "me fale um pouco sobre voce",
            "me fale sobre voce",
            "me conta um pouco sobre de vocee",
            "fale sobre voce",
            "conte sobre voce",
            "quero saber sobre voce",
            "gostaria de saber sobre voce",

        ]
        let qKey = [
            "sobre",
            "voce"
        ]
        return send(request,qContent,qKey)
    },
    pontoForte: (request) => {
        let qContent = [
            "qual seu ponto forte ?",
            "qual e o seu ponto forte ?",
            "qual voce considera seu ponto forte ?",
            "para voce, qual e o seu ponto forte ?",
            "gostaria de saber seu ponto forte",
            "qual caracteristica voceê considera seu ponto forte ?",
            "me diz qual e o seu ponto forte ?",
            "e o seu ponto forte ?",
            "agora seu ponto forte"
        ]
        let qKey = [
            "ponto",
            "forte"
        ]
        return send(request,qContent,qKey)
    },
    pontoFraco: (request) => {
        let qContent = [
            "qual seu ponto fraco ?",
            "qual e o seu ponto fraco ?",
            "qual voce considera seu ponto fraco ?",
            "para voce, qual e o seu ponto fraco ?",
            "gostaria de saber seu ponto fraco ?",
            "qual caracteristica voceê considera seu ponto fraco ?",
            "me diz qual e o seu ponto fraco ?",
            "e o seu ponto fraco ?",
            "agora o seu ponto fraco ?"
        ]
        let qKey = [
            "ponto",
            "fraco"
        ]
        return send(request,qContent,qKey)
    },
    pretensaoSalarial: (request) => {
        let qContent = [
            "qual a sua pretensao salarial ?",
            "gostaria de saber sua pretensao salarial ?",
            "me informe sua pretensao salarial",
            "qual a sua pretensao salarial ? receber pagamento",
            
        ]
        let qKey = [
            "pretensao",
            "salarial"
        ]
        return send(request,qContent,qKey)
    },
    cincoAnos: (request) => {
        let qContent = [
            "onde voce se vê daqui cinco anos ? 5",
            "como voce se vê daqui a cinco anos ? 5",
            "como voce quer se ver daqui a cinco anos? 5",
            "onde voce quer estar daqui cinco anos? 5",
            "como voce quer ser daqui cinco anos ? 5",
            "onde voce quer estar daqui a cinco anos ?",
            "como voce quer estar daqui a cinco anos ?",
            "daqui 5 anos voce se vê como ?"

        ]
        let qKey = [
            "cinco5",
            "anos"
        ]
        return send(request,qContent,qKey)
    },
    habilidadesTecnicas: (request) => { 
        let qContent = [
            "quais sao suas habilidades tecnicas ?",
            "me fale sobre suas habilidades tecnicas ?",
            "gostaria de saber sobre suas habilidades tecnicas ?",
            "quais suas habilidades tecnicas ?",
            "agora me fale sobre suas habilidades tecnicas ?",
            "e suas habilidades tecnicas ?",




        ]
        let qKey = [
            "habilidades",
            "tecnicas"
        ]
        return send(request,qContent,qKey)
    },
    habilidadesSociais: (request) => { 
        let qContent = [
            "me fale sobre suas habilidades sociais ?",
            "quais sao suas habilidades sociais ?",
            "gostaria de saber sobre suas habilidades sociais ?",
            "quais suas habilidades sociais ?",
            "agora me fale sobre suas habilidades sociais ?",
            "e suas habilidades sociais ?",

        ]
        let qKey = [
            "habilidades",
            "sociais"
        ]
        return send(request,qContent,qKey)
    },
    skills: (request) => { 
        let qContent = [
            "me fale sobre suas habilidades sociais ?",
            "quais sao suas habilidades sociais ?",
            "gostaria de saber sobre suas habilidades sociais ?",
            "agora me fale sobre suas habilidades sociais ?",

        ]
        let qKey = [
            "habilidades",
            "sociais"
        ]
        return send(request,qContent,qKey)
    },

}

export default questions;