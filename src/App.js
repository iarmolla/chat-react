import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Chat from './components/Chat';
import Login from './components/Login'
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/chat' element={<ProtectedRoute>
            <Chat />
          </ProtectedRoute>}>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
