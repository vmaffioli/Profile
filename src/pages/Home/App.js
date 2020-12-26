import './App.css';

import photo from '../../assets/img/myphoto.png';
import data from "../../data.json";

import Default from '../Default';
import Title from '../../components/Title';
import About from '../../components/About';



function App() {
  return (
    <div className="App">
      <Default />

      <Title
        photo={photo}

        name={data.map((data) => {
          return data.name;
        })}

        intr