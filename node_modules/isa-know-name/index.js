const names = require('./data.json');

exports.check = function(nameEntry){
    const  nameList = Object.values(names);
    let result = false;
    let verif = false;
    let resultList = [];

    if (typeof(nameEntry) === 'string') {
        verif = /\s/g.test(nameEntry)
        nameEntry = nameEntry.trim().toLowerCase();
        if (verif){
            nameEntry = nameEntry.split(" ");
        }
        if (typeof(nameEntry) === 'object') {

            for (let i=0;i < nameEntry.length;i++){

                nameList.forEach(name => {
                    if (name.toLowerCase() == nameEntry[i].toLowerCase()) {
                        resultList.push(nameEntry[i]);
                    };
                });
            };
            if (resultList.length > 0) {
                result = true;
            }
        } else {
            nameList.forEach(name => {
                if (name.toLowerCase() == nameEntry.toLowerCase()) {
                    result = true;
                }
            })
        }
    } else if ((typeof(nameEntry) === 'object') && !(verif)) {
        for (let i=0;i < nameEntry.length;i++){
            nameList.forEach(name => {
                if ((name.toLowerCase() == nameEntry[i].toLowerCase())) {
                    resultList.push(nameEntry[i]);
                };
            });
        };
        if (resultList.length > 0) {
            result = true
        }
    };
    return result;
}

exports.filter = function(nameEntry){
    const  nameList = Object.values(names);
    let verif = false;
    let resultList = [];

    if (typeof(nameEntry) === 'string') {
        verif = /\s/g.test(nameEntry)
        nameEntry = nameEntry.trim().toLowerCase();
        if (verif){
            nameEntry = nameEntry.split(" ");
        }
        if (typeof(nameEntry) === 'object') {

            for (let i=0;i < nameEntry.length;i++){

                nameList.forEach(name => {
                    if (name.toLowerCase() == nameEntry[i].toLowerCase()) {
                        resultList.push(name);
                    };
                });
            };
        } else {
            nameList.forEach(name => {
                if (name.toLowerCase() == nameEntry.toLowerCase()) {
                    resultList.push(name);
                }
            })
        }
    } else if ((typeof(nameEntry) === 'object') && !(verif)) {
        for (let i=0;i < nameEntry.length;i++){
            nameList.forEach(name => {
                if ((name.toLowerCase() == nameEntry[i].toLowerCase())) {
                    resultList.push(nameEntry[i]);
                };
            });
        };
 
    };
    return resultList;
}




