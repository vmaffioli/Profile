import database from '../../Firebase';

let id, date

const memorize = {

    initialize: (nmUser) => { //inicializa variaveis necessarias para o save
        id = Date.now()

        date = new Date()
        id = id + "-" + nmUser
    },


    save: (msg, type) => { //recebe mensagem e tipo do objeto a ser salvo
    
    if (type === "answered") {
            database.ref('conversations') //salva no banco de dados a pergunta desconhecida
                .once('value').then(async function (snap) {
                    database.ref(`answered/${id}`)
                        .set({
                            msg: `${msg}`,
                            date: `${date}`
                        })
                })

        } else if (type === "notAnswered") {

            database.ref('conversations') //salva no banco de dados a pergunta desconhecida
                .once('value').then(async function (snap) {
                    database.ref(`notAnswered/${id}`)
                        .set({
                            msg: `${msg}`,
                            date: `${date}`
                        })
                })
        }
    }
}



export default memorize;
