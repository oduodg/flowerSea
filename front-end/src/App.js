import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main, Login, Register, Cart, MyPage, Address, OrderTable, Payed, MyPageEdit } from './pages';
import Header from './components/header';
import Order from './pages/Order';

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
        <Route path="/mypageedit" element={<MyPageEdit />} />
        <Route path="/address" element={<Address />} />
        <Route path="/ordertable" element={<OrderTable />} />
        <Route path="/order" element={<Order />} />
        <Route path="/Payed" element={<Payed />} />
      </Routes>
    </BrowserRouter>
  );
}