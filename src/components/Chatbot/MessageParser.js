import isaName from 'isa-know-name';
import config from './config';
import questions from './questions';

// MessageParser starter code


class MessageParser {

  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;

  }


  async parse(message) {
    const msg = message.replace("?", "").toLowerCase();

    if (config.step === "presentation_init") {
      this.actionProvider.presentation(isaName.check(msg), isaName.filter(msg).toString());
    } else if (config.step === "form_init") {

      if (questions.compare(message)) {
        this.actionProvider.q01(message.normalize("NFD"));

      } else {
        this.actionProvider.dont_know();
      }
    }



  }
}

export default MessageParser;