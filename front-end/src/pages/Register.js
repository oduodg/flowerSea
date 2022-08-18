import React, {useState} from 'react'
import './Register.css';

export default function Register() {

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
          class="p-10 bg-white rounded-xl space-y-5" 
          action=""
          style={{ display: 'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
      >
        <h1 class="register">회원가입
          <span style={{color:'#f34336', fontSize:10, paddingLeft:10}}>   *는 필수 입력 사항입니다</span>
        </h1>
        <div class="registerbd"></div>
        <h3 class="rgName">이름
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              class="NameWrite" 
              type='text' 
              name='Name' 
              vlaue={Name} 
              onChange={onNameHandler} 
              placeholder = "이름은 필수라궁~"
              />
        </div>
        <span class="gender">성별
          <span style={{color:'#f34336'}}>*</span>
        </span>
        <span class="gender" style={{top:265, fontSize:13}}>남</span>
        <input
          class="malebutton"
          type="radio"
          value="1"
          checked={x === "1"}
          onChange={HandleClickRadioButton}
        />
        <span class="gender" style={{top:265, fontSize:13, left:845}}>여</span>
        <input
          class="femalebutton"
          type="radio"
          value="2"
          checked={x === "2"}
          onChange={HandleClickRadioButton}
        />
        <h3 class="rgID">아이디
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              class="idwrite" 
              type='text' 
              name='Id' 
              value={Id} 
              onChange={onIdHandler} 
              placeholder = "뭐해 아이디 안넣고!"
              />
        </div>
        <h3 class="rgPassword">비밀번호
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              class="PWwrite" 
              type='text' 
              name='Password' 
              value={Password} 
              onChange={onPasswordHandler} 
              placeholder = "아무도 모르게^ㅡ^"
              />
        </div>
        <h3 class="rgPasswordCheck">비밀번호 확인
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              class="PwCheck" 
              type='text' 
              name='PasswordCheck' 
              value={PasswordCheck} 
              onChange={onPasswordCheckHandler} 
              placeholder = "다르면 가입 안시켜쥬지롱~"
              />
        </div>
        <h3 class="rgAddress">주소
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              class="AddressWrite" 
              type='text' 
              name='Address' 
              value={Address} 
              onChange={onAddressHandler} 
              placeholder = "억까시 이겨냈동"
              />
        </div>
        <h3 class="rgPhoneNum">전화번호
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              class="PhoneNumWrite" 
              type='text' 
              name='PhoneNum' 
              value={PhoneNum} 
              onChange={onPhoneNumHandler} 
              placeholder = "비싼 번호 줘서 감사함미다!"
              />
        </div>
        <h3 class="rgEmail">이메일</h3>
        <div>
            <input 
              class="EmailWrite" 
              type='email' 
              name='Email' 
              value={Email} 
              onChange={onEmailHandler} 
              placeholder = "골뱅이 뺴먹지마"
              />
        </div>
        <div class="rgbt">
          <button class="rgbutton">회원가입하기</button>
        </div>
      </form>
    </div>

    
  )

}
