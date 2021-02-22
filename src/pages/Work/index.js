import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import PrevPage from '../../components/PrevPage';
import Chatbot from 'react-chatbot-kit';
import Exp from '../../components/Exp';
import Skills from '../../components/Skills';


import ActionProvider from "../../components/Chatbot/ActionProvider";
import MessageParser from "../../components/Chatbot/MessageParser";
import config from "../../components/Chatbot/config";





function Work() {
  const buttonIn = <button className="btn-chat_out" onClick={element => setWorkHistory({
    element: sendChatInfo
  })}>x</button>;

  const buttonOut = <button className="btn-chat" onClick={element => setWorkHistory({
    element: sendChat

  })}>Falar com Vinibot</button>;

  const sendChat = <div className="chat-container">
    <Chatbot
      config={config}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
      headerText=" "
    />

    {buttonIn}
  </div>;

  const sendChatInfo = <div>
    <Skills />
    {buttonOut}

  </div>;

  const [workHistory, setWorkHistory] = useState({
    element: sendChatInfo

  });

  return (
    <div className="work">

      <div className="style-bars" id="top-bar_w" />
      <div className="style-bars" id="bottom-bar_w" />

      <Link to="/">
        <PrevPage />
      </Link>

      <div className="content-div">
        <div>{workHistory.element}</div>

      </div>

      <Exp />


    </div>
  );
}

export default Work;
