import React from 'react'
import './MyPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyPage() {
  const domain = "http://3.38.97.195/";
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
    }}
    >
      <h1 className="register">마이페이지 - 내정보
      </h1>
      <div className="registerbd mt-0"></div>          

      <h3 className="rgName">이름
      </h3>
      <div>
        <input
          className="NameWrite"
          type='text'
          name='Name'
          placeholder=""
        />
      </div>
      <h3 className="rgID">아이디
      </h3>
      <div>
        <input
          className="idwrite"
          type='text'
          name='Id'
          placeholder=""
        />
      </div>
      <h3 className="rgAddress">주소
      </h3>
      <div>
        <input
          className="AddressWrite"
          type='text'
          name='Address'
          placeholder=""
        />
      </div>
      <h3 className="rgPhoneNum">전화번호
      </h3>
      <div>
        <input
          className="PhoneNumWrite"
          type='text'
          name='PhoneNum'
          placeholder=""
        />
      </div>
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
      <div className="rgbt">
        <button className="rgbutton">수정하기</button>
      </div>
    </div>
  )
}