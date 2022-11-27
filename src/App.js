import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Homepg from './Components/Homepg';
import Symbols from './Components/Symbols';
import Quotes from './Components/Quotes';
function App() {
  function handleSubmit(){
    
  }
    return(
      <BrowserRouter>
    
        <Routes>
    
    <Route path="/" element={<Homepg/>} /> 
    <Route path="symbols" element={<Symbols/>} />
    <Route path="symbols/:symbolName" element={<Quotes/>} />

     
      
   
  </Routes>
      </BrowserRouter>
   
    );
}

export default App;
