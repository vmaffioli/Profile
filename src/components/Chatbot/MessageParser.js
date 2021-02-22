import isaName from 'isa-know-name';
import config from './config';
import analyzeToAnswer from './core/brain';
import database from "./core/memorize";

// MessageParser starter code


class MessageParser {

  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    const msg = message.replace("?", "").toLowerCase();
    if (config.step === "presentation_init") {

      database.ref('withAnswers') //salva no banco de dados a pergunta desconhecida
      .once('value').then(async function (snap) {
          database.ref(`names/${Date.now()}`)
              .set({
                  nome: `${message}`,
                  filtrado: `${isaName.filter(message)}`
              })
      })
      this.actionProvider.presentation(isaName.check(msg), isaName.filter(msg).toString());

    } else if (config.step === "form_init") {
      this.actionProvider.sendAnswer(analyzeToAnswer.compare(message.normalize("NFD")))

    }
  }
}

export default MessageParser;