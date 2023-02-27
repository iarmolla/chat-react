import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Chat from './components/Chat';
import Login from './components/Login'
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
