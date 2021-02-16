// ActionProvider starter code
import config from './config';
import messages from './messages';


let message;


class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  default = () => {
    message = [
      this.createChatBotMessage(messages.all_1(), { delay: 1000 })
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  presentation = (resultIsa, name) => {
    if (resultIsa) {
      message = [
        this.createChatBotMessage(messages.askName_finish(name)),
        this.createChatBotMessage(messages.presentation_finish(name), { delay: 500 })
      ];
      message.forEach(e => {
        this.addMessageToState(e);
      });
    } else {
      message = [
        this.createChatBotMessage(messages.askName_finish("$$IsaFalse%%")),
        this.createChatBotMessage(messages.presentation_finish("$$IsaFalse%%"), { delay: 500 })
      ];
      message.forEach(e => {
        this.addMessageToState(e);
      });
    }
    config.step = "form_init"
  }

  all = (msg) => {
    message = [
      this.createChatBotMessage(messages.all_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.all_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.all_3(msg), { delay: 5000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  dont_know = () => {
    message = [
      this.createChatBotMessage(messages.dont_know(), { delay: 1000 })
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q01 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q01_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q01_2(msg), { delay: 4000 }),
      this.createChatBotMessage(messages.q01_3(msg), { delay: 8000 })
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q02 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q02_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q02_2(msg), { delay: 4000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q03 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q03_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q03_2(msg), { delay: 4000 })
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q04 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q04_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q04_2(msg), { delay: 4000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q05 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q05_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q05_2(msg), { delay: 4000 }),
      this.createChatBotMessage(messages.q05_3(msg), { delay: 7000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q06 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q06_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q06_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q06_3(msg), { delay: 5000 }),
      this.createChatBotMessage(messages.q06_4(msg), { delay: 8000 }),

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q07 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q07_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q07_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q07_3(msg), { delay: 5000 }),


    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q08 = (msg) => {
    message = [
      this.createChatBotMessage(messages.q08_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q08_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q08_2(msg), { delay: 5000 }),

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }



  addMessageToState = (message) => {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));

  };


}

export default ActionProvider;