import React, {useState} from 'react'
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
      width: '100%', height: '100vh', overflow:'scroll'
      }}
  >
      <form 
          classname="p-10 bg-white rounded-xl space-y-5" 
          action=""
          style={{ display: 'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
      >
        <h1 classname="register">마이페이지 - 내정보
          <span style={{color:'#f34336', fontSize:10, paddingLeft:10}}> </span>
        </h1>
        <div classname="registerbd"></div>
        <h3 classname="rgName">이름
        </h3>
        <div>
            <input 
              classname="NameWrite" 
              type='text' 
              name='Name' 
              vlaue={Name} 
              onChange={onNameHandler} 
              placeholder = ""
              />
        </div>
        <h3 classname="rgID">아이디
        </h3>
        <div>
            <input 
              classname="idwrite" 
              type='text' 
              name='Id' 
              value={Id} 
              onChange={onIdHandler} 
              placeholder = ""
              />
        </div>
      
      
        <h3 classname="rgAddress">주소
        </h3>
        <div>
            <input 
              classname="AddressWrite" 
              type='text' 
              name='Address' 
              value={Address} 
              onChange={onAddressHandler} 
              placeholder = ""
              />
        </div>
        <h3 classname="rgPhoneNum">전화번호
        </h3>
        <div>
            <input 
              classname="PhoneNumWrite" 
              type='text' 
              name='PhoneNum' 
              value={PhoneNum} 
              onChange={onPhoneNumHandler} 
              placeholder = ""
              />
        </div>
        
        <div clasname="sidemenu">마이페이지</div>
        
        
        <div classname="MyInfo">
          <Link to="/mypage">
          <button classname="GoMyPage">내 정보</button>
          </Link>
        </div>

        <div classname="OrderTable">
          <Link to="/ordertable">
          <button class="GoOrderTable">주문 목록</button>
          </Link>
        </div>



        
        <div class="rgbt">
          <button class="rgbutton">수정하기</button>
        </div>
      </form>
    </div>

    
  )

}


