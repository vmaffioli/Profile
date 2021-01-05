import { Link } from 'react-router-dom';
import './style.css';

import PrevPage from '../../components/PrevPage';
import Skills from '../../components/Skills';
import Exp from '../../components/Exp';






function Work() {
  return (
    <div className="work">

        <div className="style-bars" id="top-bar_w"/>
        <div className="style-bars" id="bottom-bar_w"/>

      <Link to="/">
        <PrevPage />
      </Link>

      <Skills />

      

      <Exp  />


    </div>
  );
}

export default Work;
