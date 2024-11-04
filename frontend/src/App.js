import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { CurrentUser } from './components/UserContext';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
   <CurrentUser>
     <div className="w-screen h-screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
    </div>
   </CurrentUser>
  );
}

export default App;
