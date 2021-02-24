import isaName from 'isa-know-name';
import config from './config';
import analyzeInput from './core/brain';
import memorize from "../Chatbot/core/memorize";

// MessageParser starter code


class MessageParser {

  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    const msg = message.replace("?", "").toLowerCase();

    if (config.step === "presentation_init") {

        if(isaName.check(msg)) {
          memorize.initialize(isaName.filter(msg))
        } else {
          memorize.initialize("unknowuser")
        }

        this.actionProvider.presentation(isaName.check(msg), isaName.filter(msg).toString());

    } else if (config.step === "form_init") {
      this.actionProvider.sendAnswer(analyzeInput.reply(msg))

    }
  }
}

export default MessageParser;