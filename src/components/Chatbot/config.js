import { createChatBotMessage } from "react-chatbot-kit";
import messages from "./messages";

const botName = "Vinibot";


const config = {
    botName: botName,
    lang: "no",
    step: "form_init", //presentation_init form_init
    ansCount: 0,
    ansHist: [
      "default"
    ],

    customStyles: {
        botMessageBox: {
          backgroundColor: "#cc0000",
        },
        chatButton: {
          backgroundColor: "lightgray",
        },
        
      },

      initialMessages: [
        createChatBotMessage(messages.presentation_init()),
        createChatBotMessage(
          messages.askName_init(),
          {
            delay: 500,
          }
        ),
      ]

};

export default config;