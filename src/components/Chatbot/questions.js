

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
            "quais perguntas você sabe responder ?",
            "quais perguntas você conhece ?",
            "quais perguntas você consegue responder ?",
            "quais perguntas você pode responder ?",

        ]
        let qKey = [
            "você",
            "perguntas"
        ]
        return send(request,qContent,qKey)
    },
    aboutMe: (request) => {
        let qContent = [
            "me conte sobre você",
            "gostaria de saber sobre você",
            "me fale um pouco sobre você",
            "me fale sobre você",
            "me conta um pouco sobre de vocêe",
            "fale sobre você",
            "conte sobre você",
            "quero saber sobre você",
            "gostaria de saber sobre você",

        ]
        let qKey = [
            "sobre",
            "você"
        ]
        return send(request,qContent,qKey)
    },
    pontoForte: (request) => {
        let qContent = [
            "qual seu ponto forte ?",
            "qual é o seu ponto forte ?",
            "qual vocêê considera seu ponto forte ?",
            "para vocêê, qual é o seu ponto forte ?",
            "gostaria de saber seu ponto forte",
            "qual caracteristica vocêê considera seu ponto forte ?",
            "me diz qual é o seu ponto forte ?",
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
            "qual é o seu ponto fraco ?",
            "qual vocêê considera seu ponto fraco ?",
            "para vocêê, qual é o seu ponto fraco ?",
            "gostaria de saber seu ponto fraco ?",
            "qual caracteristica vocêê considera seu ponto fraco ?",
            "me diz qual é o seu ponto fraco ?",
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
            "qual a sua pretensão salarial ?",
            "gostaria de saber sua pretensão salarial ?",
            "me informe sua pretensão salarial",
            "qual a sua pretensão salarial ? receber pagamento",
            "qual a sua pretensão de salario ?",

            
        ]
        let qKey = [
            "pretensão",
            "salari"
        ]
        return send(request,qContent,qKey)
    },
    cincoAnos: (request) => {
        let qContent = [
            "onde vocêê se vê daqui cinco anos ? 5",
            "como vocêê se vê daqui a cinco anos ? 5",
            "como vocêê quer se ver daqui a cinco anos? 5",
            "onde vocêê quer estar daqui cinco anos? 5",
            "como vocêê quer ser daqui cinco anos ? 5",
            "onde vocêê quer estar daqui a cinco anos ?",
            "como vocêê quer estar daqui a cinco anos ?",
            "daqui 5 anos vocêê se vê como ?"

        ]
        let qKey = [
            "cinco5",
            "anos"
        ]
        return send(request,qContent,qKey)
    },
    habilidadesTecnicas: (request) => { 
        let qContent = [
            "quais são suas habilidades técnicas ?",
            "me fale sobre suas habilidades técnicas ?",
            "gostaria de saber sobre suas habilidades técnicas ?",
            "quais suas habilidades técnicas ?",
            "agora me fale sobre suas habilidades técnicas ?",
            "e suas habilidades técnicas ?",




        ]
        let qKey = [
            "habilidades",
            "técnicas"
        ]
        return send(request,qContent,qKey)
    },
    habilidadesSociais: (request) => { 
        let qContent = [
            "me fale sobre suas habilidades sociais ?",
            "quais são suas habilidades sociais ?",
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
            "quais são suas habilidades sociais ?",
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