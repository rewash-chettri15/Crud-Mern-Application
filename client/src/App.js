import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from './components/Navbar';
import Home from './components/Home';
import{BrowserRouter, Route, Routes} from "react-router-dom";
import Register from './components/Register';
import Edit from './components/Edit';
import Detail from './components/Detail';

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/edit/:id" element={<Edit/>} />
      <Route exact path="/view/:id" element={<Detail/>} />

      </Routes>
    
    </BrowserRouter>
    </>
  );

}

export default App;
