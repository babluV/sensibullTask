import {useNavigate} from 'react-router-dom'
import './Style.css'

function Homepg() {
    var  navigate = useNavigate();

    function handleSubmit(){
      navigate("symbols")
    }
    return (
      <div className='container'>
        <h1>Welcome 🥰🥰</h1>
      <span className="Homepg">
        <button onClick={handleSubmit}>Show List Of Symbol</button>
      </span>
      </div>
    );
  }
  
  export default Homepg;
  