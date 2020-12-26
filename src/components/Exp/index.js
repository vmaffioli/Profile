import { useState } from 'react';
import './style.css';



function Exp(props) {
  const [workHistory, setWorkHistory] = useState({
    workName: 'Experiências', 
    workInfo: '', 
    workDesc: 'Possuo dois anos de experiência com programação em geral, tive a oportunidade de estagiar para cliente bancário utilizando JAVA, COBOL e mySQL, os quais me serviram de alicerce para desenvolver autonomia de aprendizado. Após ter tido contato mais profundo com Javascritpt, escolhi começar a estudar Node.js e React.js e bancos de dados noSQL como mongoDB e Firebase.'
  });




  return (


    <div className="exp-div">

      <button className="work-button" id="btn-brq"
        onClick={e => setWorkHistory({
          workName: "BRQ",
          workInfo: "Estágio em desenvolvimento de sistemas - 2019/2020",
          workDesc: "Criação de scripts para atividades diárias, incluindo automatizações e alterações em massa para ambientes de programas COBOL. Construção de back-end JAVA para Intranet (busca e filtragem de dados para montagem de Relatórios Bancários). Criação de procedures e manutenção em banco de dados SQL Server."
        })}>

        BRQ
        </button>

      <button className="work-button" id="btn-ttec"
        onClick={e => setWorkHistory({
          workName: "TTEC",
          workInfo: "Especialista em atendimento - 2017/2018",
          workDesc: "Suporte em utilização de produtos digitais bancários (cartões virtuais, aplicativos e compras online).  Identificar o ambiente do cliente para melhor solução do problema."
        })}>

        TTEC
        </button>

      <button className="work-button" id="btn-icesp"
        onClick={e => setWorkHistory({
          workName: "ICESP",
          workInfo: "Oficial Administrativo- 2016/2017",
          workDesc: "Recepção geral de pacientes e acompanhantes, responsável por protocolo de documentos, agendamentos, protocolo de laudos de exames, operação de sistema de cadastro em geral de pacientes e acompanhantes.",
        })}>
        ICESP
        </button>
        

      <div className="content-div">
        <h2 id="work-name">{workHistory.workName}</h2>
        <p id="work-info">{workHistory.workInfo}</p>
        <p>{workHistory.workDesc}</p>
      </div>

    </div>

  )



}


export default Exp;
