import './style.css';


  function Title(props) {

    return (


      <div className="title-div">

        <img className="photo" src={props.photo} alt="myphoto"></img>

        <h1 id="h-name">{props.name}</h1>

        <p id="p-intro">{props.intro}</p>

      </div>
      
    )



  }


  export default Title;
