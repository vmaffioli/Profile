import isaName from 'isa-know-name';
import config from './config';
import analyzeToAnswer from './core/brain';

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
      this.actionProvider.sendAnswer(analyzeToAnswer.compare(message.normalize("NFD")))

    }
  }
}

export default MessageParser;