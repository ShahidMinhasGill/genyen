import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  BrowserRouter,
  Routes, 
} from "react-router-dom";
import Home from './pages/Home';
import Index from './pages/Index';


function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes> 
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/" element={<Index />} />  
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
