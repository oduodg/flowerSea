import React from 'react'
import './MyPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyPage() {
  const domain = "http://192.168.35.160:8080/";
  const userInfo = async () => {
    try {
      const res = await axios.get(domain + "api/userinfo/", {
        headers: `Token ${localStorage.getItem("userToken")}`
      });
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("PhoneNum", res.data.phoneNum);
      localStorage.setItem("address", res.data.address);
    } catch (err) {
      console.log("Server Error");
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', overflow: 'scroll'
    }}>
      <h1 className="register">마이페이지 - 내정보</h1>
      <div className="mt-5 registerbd"></div>
      
      <h3 className="rgName">이름 : {localStorage.userName}</h3>
      <h3 className="rgAddress">주소 : {localStorage.address}</h3>
      <h3 className="rgPhoneNum">전화번호 : {localStorage.phoneNum}</h3>

      <div className="sidemenu">마이페이지</div>
      <div className="MyInfo">
        <Link to="/mypage">
          <button className="GoMyPage">내 정보</button>
        </Link>
      </div>

      <div className="OrderTable">
        <Link to="/ordertable">
          <button className="GoOrderTable">주문 목록</button>
        </Link>
      </div>
    </div>
  )
}