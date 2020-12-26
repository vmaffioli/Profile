import './style.css';
import linkedinIco from "../../assets/img/linkedin.png";
import githubIco from "../../assets/img/github.png";






function About(props) {
 

  return (


    <div className="about-div">

      <p id="p-desc">{props.description}</p>

      <a className="shortcuts" href={props.linkedin}>
        <img id="icon-linkedin" src={linkedinIco} alt="ico-linkedin" />
      </a>

      <a className="shortcuts" href={props.github}>
        <img id="icon-github" src={githubIco} alt="ico-github" />
      </a>



    </div>

  )



}


export default About;
