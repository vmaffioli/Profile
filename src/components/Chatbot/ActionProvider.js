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
      this.createChatBotMessage(messages.all_3(msg), { delay: 5000 }),
      this.createChatBotMessage(messages.all_4(msg), { delay: 8000 }),


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

  q01 = (msg) => { //about
    message = [
      this.createChatBotMessage(messages.q01_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q01_2(msg), { delay: 4000 }),
      this.createChatBotMessage(messages.q01_3(msg), { delay: 8000 })
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q02 = (msg) => { //forte
    message = [
      this.createChatBotMessage(messages.q02_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q02_2(msg), { delay: 4000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q03 = (msg) => { //fraco
    message = [
      this.createChatBotMessage(messages.q03_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q03_2(msg), { delay: 4000 })
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q04 = (msg) => { //pretensao
    message = [
      this.createChatBotMessage(messages.q04_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q04_2(msg), { delay: 4000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q05 = (msg) => { //5anos
    message = [
      this.createChatBotMessage(messages.q05_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q05_2(msg), { delay: 4000 }),
      this.createChatBotMessage(messages.q05_3(msg), { delay: 7000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q06 = (msg) => { //habil tec
    message = [
      this.createChatBotMessage(messages.q06_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q06_2(msg), { delay: 3500 }),
      this.createChatBotMessage(messages.q06_3(msg), { delay: 6000 }),
      this.createChatBotMessage(messages.q06_4(msg), { delay: 9000 }),

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q07 = (msg) => { //habil soc
    message = [
      this.createChatBotMessage(messages.q07_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q07_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q07_3(msg), { delay: 5000 }),


    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q08 = (msg) => { //acesso estacao
    message = [
      this.createChatBotMessage(messages.q08_3(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q08_1(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q08_2(msg), { delay: 5000 }),

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q09 = (msg) => { //fortefraco
    message = [
      this.createChatBotMessage(messages.q09_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q02_1(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q02_2(msg), { delay: 5500 }),
      this.createChatBotMessage(messages.q09_2(msg), { delay: 8000 }),
      this.createChatBotMessage(messages.q03_1(msg), { delay: 10000 }),
      this.createChatBotMessage(messages.q03_2(msg), { delay: 13000 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }

  q10 = (msg) => { //habiltecsoc
    message = [
      this.createChatBotMessage(messages.q10_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q06_1(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q06_2(msg), { delay: 5500 }),
      this.createChatBotMessage(messages.q06_3(msg), { delay: 9000 }),
      this.createChatBotMessage(messages.q06_4(msg), { delay: 11500 }),
      this.createChatBotMessage(messages.q10_2(msg), { delay: 14000 }),
      this.createChatBotMessage(messages.q07_1(msg), { delay: 16000 }),
      this.createChatBotMessage(messages.q07_2(msg), { delay: 18500 }),
      this.createChatBotMessage(messages.q07_3(msg), { delay: 21500 })

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }
  q11 = (msg) => { //tempoprograma
    message = [
      this.createChatBotMessage(messages.q11_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q11_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q11_3(msg), { delay: 6000 }),
      this.createChatBotMessage(messages.q11_4(msg), { delay: 9000 }),
      this.createChatBotMessage(messages.q11_5(msg), { delay: 12000 }),
   
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }
  q12 = (msg) => { //signo
    message = [
      this.createChatBotMessage(messages.q12_1(msg), { delay: 1000 }),
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }
  q13 = (msg) => { //motivacao
    message = [
      this.createChatBotMessage(messages.q13_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q13_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q13_3(msg), { delay: 6000 }),
      this.createChatBotMessage(messages.q13_4(msg), { delay: 9000 }),
    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }
  q14 = (msg) => { //situaçoes
    message = [
      this.createChatBotMessage(messages.q14_1(msg), { delay: 1000 }),

    ];
    message.forEach(e => {
      this.addMessageToState(e);
    })
  }
  q15 = (msg) => { //realizaçoes
    message = [
      this.createChatBotMessage(messages.q15_1(msg), { delay: 1000 }),
      this.createChatBotMessage(messages.q15_2(msg), { delay: 3000 }),
      this.createChatBotMessage(messages.q15_3(msg), { delay: 5500 }),
      this.createChatBotMessage(messages.q15_4(msg), { delay: 7500 }),
      this.createChatBotMessage(messages.q15_5(msg), { delay: 10000 }),

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