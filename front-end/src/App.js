import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Login, Register, Cart, MyPage, OrderTable } from './pages';
import Header from './components/header';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} exact={true} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/ordertable" element={<OrderTable />} />
      </Routes>
    </BrowserRouter>
  );
}