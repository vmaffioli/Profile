// ActionProvider starter code
import config from './config';
import messages from './messages';
import memorizedQuestions from './memorizedQuestions.json';


let message;


class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  sendAnswer = (answersList) => {
    const message = []
    let receivedCode_all = false

    console.log(answersList)



    if (answersList[0] === "%%all%%") {//temporario so para  retorno do 'que o bot consegue responder'
      answersList = []

      
      for (let i = 0; i < memorizedQuestions.length; i++) {
        const questionDesc = memorizedQuestions[i].desc

        if (i === 0) {
          //answersList.push(messages.all)
          answersList.push("Perguntas ou assuntos que eu sei responder:")

        } else if ((i > 0) || (questionDesc.length > 0)) {
          answersList.push(questionDesc)
        }
      }
      receivedCode_all = true //arrumar

    } else if (answersList[0] === "%%dontknow%%") {
      answersList = ["Não entendi muito bem."]


    }

    for (let i = 0; i < answersList.length; i++) { //separa as respostas
      const answer = answersList[i]
      let delayValue = 1000 //  tempo inicial do delay

      if (receivedCode_all) { // seta fixo para retornar oq sabe responder
        if (i > 0) {
          delayValue = delayValue + (i * 333) //tempo acumulado do delay para %%all%%
        }
      } else {
        if (i > 0) {
          delayValue = delayValue + (i * 3500) //tempo acumulado do delay
        }
      }

      message.push(this.createChatBotMessage(answer, { delay: delayValue })) //monta o message 
    }
    message.forEach(e => { //envia o message
      this.addMessageToState(e);
    })
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

  dont_know = () => {
    message = [
      this.createChatBotMessage(messages.dont_know(), { delay: 1000 })
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