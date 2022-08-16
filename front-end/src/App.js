import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Login, Register } from './pages';
import Header from './components/header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} exact={true} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}