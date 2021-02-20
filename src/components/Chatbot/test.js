if (validadeQuestionIn.length > 1) {
    key.forEach(e => {
        if (Array.isArray(e)) {
            e.forEach(element => {
                validadeQuestionIn.forEach(eIn => {
                    if (eIn === element) {
                        innerBool.push(true)
                    } else {
                        innerBool.push(false)
                    }
                })
            });
            innerBool.forEach(b => {
                if (b) {
                    bool = true
                }
            });

        } else {
            key.forEach(eK => {
                validadeQuestionIn.forEach(eIn => {
                    if (eIn === eK) {
                        innerBool.push(true)
                    } else {
                        innerBool.push(false)
                    }
                })
            })
            innerBool.forEach(b => {
                if (b) {
                    bool = true
                }
            });
        }
    })
} else {
    bool = false
}




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
