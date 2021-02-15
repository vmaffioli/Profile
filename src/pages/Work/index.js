import { Link } from 'react-router-dom';
import './style.css';

import PrevPage from '../../components/PrevPage';
import Chatbot from 'react-chatbot-kit';
import Exp from '../../components/Exp';

import ActionProvider from "../../components/Chatbot/ActionProvider";
import MessageParser from "../../components/Chatbot/MessageParser";
import config from "../../components/Chatbot/config";





function Work() {
  return (
    <div className="work">

        <div className="style-bars" id="top-bar_w"/>
        <div className="style-bars" id="bottom-bar_w"/>

      <Link to="/">
        <PrevPage />
      </Link>

      <div className="chat-container">
        <Chatbot 
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
        />
      </div>

      

      <Exp  />


    </div>
  );
}

export default Work;
