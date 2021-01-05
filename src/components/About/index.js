import './style.css';
import linkedinIco from "../../assets/img/linkedin.png";
import githubIco from "../../assets/img/github.png";
import downloadIco from "../../assets/img/download.png";


function About(props) {
  return (
    <div className="about-div">

      <p id="p-desc">{props.description}</p>

      <a className="shortcuts" href={props.linkedin} target="_blank" rel="noreferrer">
        <img id="icon-linkedin" src={linkedinIco} alt="ico-linkedin" />
      </a>

      <a className="shortcuts" href={props.github} target="_blank" rel="noreferrer">
        <img id="icon-github" src={githubIco} alt="ico-github" />
      </a>

      <a className="shortcuts" href={props.download} target="_blank" rel="noreferrer">
        <img id="icon-download" src={downloadIco} alt="CV DOWNLOAD" />
      </a>




    </div>

  )



}


export default About;
