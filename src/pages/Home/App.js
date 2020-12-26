import { Link } from 'react-router-dom';

import './App.css';

import photo from '../../assets/img/myphoto.png';
import data from "../../data.json";

import Default from '../Default';
import Title from '../../components/Title';
import About from '../../components/About';
import NextPage from '../../components/NextPage';



function App() {
  return (
    <div className="App">
      <Default />
      <div className="style-bars" id="top-bar_h"/>
      <div className="style-bars" id="bottom-bar_h"/>

      <Title
        photo={photo}

        name={data.map((data) => {
          return data.name;
        })}

        intro={data.map((data) => {
          return data.intro;
        })}



      />

      <About
        description={data.map((data) => {
          return data.description;
        })}

        linkedin={data.map((data) => {
          return data.linkedin;
        })}

        github={data.map((data) => {
          return data.github;
        })}

        email={data.map((data) => {
          return data.email;
        })}

      />

      

      <Link to="/work">
        <NextPage />
      </Link>

    </div>
  );
}

export default App;
