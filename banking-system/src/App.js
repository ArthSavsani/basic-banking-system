//import './App.css';
import Homepage from './Components/Homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Customers from './Components/Customers';
function App() {
  const CloseButton = ({ closeToast }) => (
    <i
      className="material-icons"
      onClick={closeToast}
    >
      delete
    </i>
  );
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer closeButton={CloseButton} />
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/customers" element={<Customers />}></Route>
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
