import React, { useEffect, useState } from 'react'
import './MyPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyPage() {
  const domain = "http://3.38.97.195/";
  // const domain = "http://127.0.0.1:8000/";
  const [userName, setUserName] = useState(''); 
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const accessToken = localStorage.getItem("userToken");
        const response = await axios.get(domain + "/api/userinfo/", {
            headers: {
              Authorization: `token ${accessToken}`
          }
        });
        setUserName(response.data.name);
        setPhoneNum(response.data.phoneNum);
        setAddress(response.data.address);
        setEmail(response.data.email);
      } catch (e) {
        console.error(e.message);
      }
    }
    getData();
  }, []);

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
      <div
          className="NameWrite"
          type='text'
          name='Name'
        >  
        {userName}
      </div>
      <h3 className="rgID">전화번호
      </h3>
      <div         
          className="idwrite"
          type='text'
          name='Id'
        >
        {phoneNum}
      </div>
      <h3 className="rgAddress">주소
      </h3>
      <div
          className="AddressWrite"
          type='text'
          name='Address'
        >
        {address}
      </div>
      <h3 className="rgPhoneNum">이메일
      </h3>
      <div
          className="PhoneNumWrite"
          type='text'
          name='PhoneNum'
        >
        {email}
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
        <Link to="/mypageedit">
          <button className="rgbutton">수정하기</button>
        </Link>
      </div> */}
    </div>
  )
}