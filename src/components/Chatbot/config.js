import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import messages from "./messages";
import myPhoto from "../../assets/img/myphoto.png";

const botName = "Vinibot";


const config = {
    botName: botName,
    lang: "no",
    step: "form_init",
    ansCount: 0,
    ansHist: [
      "default"
    ],
    customComponents: {
      //header: () => <p><strong>VINIBOT</strong></p>,

    },
    customStyles: {
        botMessageBox: {
          backgroundColor: "#cc0000",
        },
        chatButton: {
          backgroundColor: "#000",
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