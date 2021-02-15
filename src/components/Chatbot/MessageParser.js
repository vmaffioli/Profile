import isaName from 'isa-know-name';
import config from './config';
import questions from './questions';

// MessageParser starter code


class MessageParser {

  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;

  }


  parse(message) {
    const msg = message.toLowerCase();



    if (config.step === "presentation_init") {
      this.actionProvider.presentation(isaName.check(msg), isaName.filter(msg).toString());
    } else if (config.step === "form_init") {

      if (questions.compare(questions.aboutMe('content'), questions.aboutMe('key'), message)) {
        this.actionProvider.q01(message);

      } else if (questions.compare(questions.pontoForte('content'), questions.pontoForte('key'), message)) {
        this.actionProvider.q02(message);

      } else if (questions.compare(questions.pontoFraco('content'), questions.pontoFraco('key'), message)) {
        this.actionProvider.q03(message);

      } else if (questions.compare(questions.pretensaoSalarial('content'), questions.pretensaoSalarial('key'), message)) {
        this.actionProvider.q04(message);

      } else if (questions.compare(questions.cincoAnos('content'), questions.cincoAnos('key'), message)) {
        this.actionProvider.q05(message);

      } else if (questions.compare(questions.habilidadesTecnicas('content'), questions.habilidadesTecnicas('key'), message)) {
        this.actionProvider.q06(message);

      } else if (questions.compare(questions.habilidadesSociais('content'), questions.habilidadesSociais('key'), message)) {
        this.actionProvider.q07(message);

      } else if (questions.compare(questions.all('content'), questions.all('key'), message)) {
        this.actionProvider.all(message);

      } else {
        this.actionProvider.dont_know();
      }
    }



  }
}

export default MessageParser;