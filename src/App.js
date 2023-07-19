import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './views/Chat';
import Login from './views/Login'
import Register from './views/Register';
import ProtectedRoute from './views/ProtectedRoute'
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
