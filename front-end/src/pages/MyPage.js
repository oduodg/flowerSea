import React, { useState } from 'react'
import './MyPage.css';
import { Link } from 'react-router-dom';


export default function MyPage() {

  const [Name, setName] = useState("")
  const [Id, setId] = useState("")
  const [Password, setPassword] = useState("")
  const [PasswordCheck, setPasswordCheck] = useState("")
  const [Address, setAddress] = useState("")
  const [PhoneNum, setPhoneNum] = useState("")
  const [Email, setEmail] = useState("")
  const [x, setX] = useState([]);

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onIdHandler = (event) => {
    setId(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onPasswordCheckHandler = (event) => {
    setPasswordCheck(event.currentTarget.value)
  }

  const onAddressHandler = (event) => {
    setAddress(event.currentTarget.value)
  }

  const onPhoneNumHandler = (event) => {
    setPhoneNum(event.currentTarget.value)
  }

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }


  const HandleClickRadioButton = (e) => {
    console.log(e.target.value)
    setX(e.target.value)
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', overflow: 'scroll'
    }}
    >
      <form
        className="p-10 space-y-5 bg-white rounded-xl"
        action=""
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <h1 className="register">마이페이지 - 내정보
          <span style={{ color: '#f34336', fontSize: 10, paddingLeft: 10 }}> </span>
        </h1>
        <div className="registerbd"></div>
        <h3 className="rgName">이름
        </h3>
        <div>
          <input
            className="NameWrite"
            type='text'
            name='Name'
            vlaue={Name}
            onChange={onNameHandler}
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
            value={Id}
            onChange={onIdHandler}
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
            value={Address}
            onChange={onAddressHandler}
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
            value={PhoneNum}
            onChange={onPhoneNumHandler}
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
      </form>
    </div>
  )
}