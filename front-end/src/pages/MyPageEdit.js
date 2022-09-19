import React, { useEffect, useState } from 'react'
import './MyPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MyPageEdit() {
  const domain = "http://3.38.97.195/";
  // const domain = "http://127.0.0.1:8000/";
  const navigate = useNavigate();

  const [userName, setUserName] = useState(''); 
  const [phoneNum, setPhoneNum] = useState('');
  const [address, setAddress] = useState('');
//   const [Id, setId] = useState(''); 
//   const [Password, setPassword] = useState('');
//   const [PasswordCheck, setPasswordCheck] = useState('');
  const [email, setEmail] = useState('');

  const [newUserName, setNewUserName] = useState(''); 
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleName = (e) => {
    setNewUserName(e.target.value);
  };

  const handlePhoneNum = (e) => {
    setNewPhoneNum(e.target.value)
  };
  
  const handleAddress = (e) => {
    setNewAddress(e.target.value);
  };

  const handleEmail = (e) => {
    // if(!(e.target.value.includes('@'))){
    //     alert("email형식이 맞지 않아용~");
    // }
    setNewEmail(e.target.value)
    
  };

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
        // setId(response.data.username);
        // setPassword(response.data.password);
        // setPasswordCheck(response.data.password2);
      } catch (e) {
        console.error(e.message);
      }
    }
    getData();
  }, []);
  
  const userData = {
    name: newUserName == '' ? userName : newUserName,
    phoneNum: newPhoneNum == '' ? phoneNum : newPhoneNum,
    address: newAddress == '' ? address : newAddress,
    email: newEmail == '' ? email : newEmail,
    // username: Id,
	// password: Password,
    // password2: PasswordCheck,
  }
  
  const onSubmit = async () => {
    try {
        if (newUserName === "" && newPhoneNum === "" && newEmail === "" && newAddress === "") {
            alert("수정할 사항을 입력해주세요.");
            return;
        }
        else if (!(newEmail.includes('@')) && newEmail !== ""){
            alert("이메일 형식을 올바르게 넣어주세용!");
            return;
        }
        console.log(userData);
        const accessToken = localStorage.getItem("userToken");
        const res = await axios.put(domain + "api/userinfo/", userData,{
            headers: {
              Authorization: `token ${accessToken}`
            }
        }); 
        console.log(res)
        return navigate("/mypage");
    } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
            alert("수정안해줄곤뎅~.");
        } 
        else {
            alert("서버 에러입니다.");
        }
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
      <input
          className="NameWrite"
          type='text' 
          name='newUserName' 
          value={newUserName} 
          onChange={handleName}
          placeholder={userName}
        >  
      </input>
      <h3 className="rgID">전화번호
      </h3>
      <input        
          className="idwrite"
          type='text'
          name='newPhoneNum' 
          value={newPhoneNum} 
          onChange={handlePhoneNum}
          placeholder={phoneNum}
        >
        {/* {phoneNum} */}
      </input>
      <h3 className="rgAddress">주소
      </h3>
      <input
          className="AddressWrite"
          type='text'
          name='newAddress' 
          value={newAddress} 
          onChange={handleAddress}
          placeholder={address}
        >
        {/* {address} */}
      </input>
      <h3 className="rgPhoneNum">이메일
      </h3>
      <input
          className="PhoneNumWrite"
          type='email'
          name='newEmail' 
          value={newEmail} 
          onChange={handleEmail}
          placeholder={email}
        >
        {/* {email} */}
      </input>
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
        <Link to="/mypage">
          <button className="rgbutton" type='submit' onClick={onSubmit}>수정완료!</button>
        </Link>
      </div>
    </div>
  )
}