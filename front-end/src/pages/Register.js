import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './Register.css';
import axios from 'axios';

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

  // const domain = "http://127.0.0.1:8000/";
  const domain = "http://3.38.97.195/"
  const navigate = useNavigate();

  const HandleClickRadioButton = (e) => {
    console.log(e.target.value)
    setX(e.target.value)
  }

  const userData = {
		username: Id,
		password: Password,
    password2: PasswordCheck,
    name: Name,
    phoneNum: PhoneNum,
    address: Address,
    email: Email
	}

  const onSubmit = async () => {
		try {
			if (Name === "" || Password === "" || PasswordCheck === "" || Id === "" || Address === "" || PhoneNum === "" || Email === "") {
				alert("모든 항목에 입력해주세요.");
				return;
			}
			const res = await axios.put(domain + "api/userinfo/signup/", userData);
		  //localStorage.setItem("userToken", res.data.token);
			//localStorage.setItem("userName", res.data.name);
			return navigate("/login");
		} catch (err) {
			// console.log(err);
			if (err.response.status === 400) {
				alert("시룬뎅~ 회원가입 안해줄건뎅~");
			} else {
				alert("서버 에러입니다.");
			}
		}
	}

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', overflow:'scroll'
      }}
  >
      <form 
          className="p-10 bg-white rounded-xl space-y-5" 
          action=""
          style={{ display: 'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
      >
        <h1 className="register -ml-3">회원가입
          <span style={{color:'#f34336', fontSize:10, paddingLeft:10}}>   *는 필수 입력 사항입니다</span>
        </h1>
        <div className="registerbd -ml-3"></div>
        <h3 className="rgName -ml-3">이름
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              className="NameWrite -ml-3" 
              type='text' 
              name='Name' 
              value={Name} 
              onChange={onNameHandler} 
              placeholder = "이름은 필수라궁~"
              />
        </div>
        <span className="gender -ml-3">성별
          <span style={{color:'#f34336'}}>*</span>
        </span>
        <span className="gender -ml-3" style={{top:265, fontSize:13}}>남</span>
        <input
          className="malebutton"
          type="radio"
          value="1"
          checked={x === "1"}
          onChange={HandleClickRadioButton}
        />
        <span className="gender" style={{top:265, fontSize:13, left:845}}>여</span>
        <input
          className="femalebutton"
          type="radio"
          value="2"
          checked={x === "2"}
          onChange={HandleClickRadioButton}
        />
        <h3 className="rgID -ml-3">아이디
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              className="idwrite -ml-3" 
              type='text' 
              name='Id' 
              value={Id} 
              onChange={onIdHandler} 
              placeholder = "뭐해 아이디 안넣고!"
              />
        </div>
        <h3 className="rgPassword -ml-3">비밀번호
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              className="PWwrite -ml-3" 
              type='password' 
              name='Password' 
              value={Password} 
              onChange={onPasswordHandler} 
              placeholder = "아무도 모르게^ㅡ^"
              />
        </div>
        <h3 className="rgPasswordCheck -ml-3">비밀번호 확인
          <span style={{color:'#f34336'}}>*</span>
        </h3>
        <div>
            <input 
              className="PwCheck -ml-3" 
              type='password' 
              name='PasswordCheck' 
              value={PasswordCheck} 
              onChange={onPasswordCheckHandler} 
              placeholder = "다르면 가입 안시켜쥬지롱~"
              />
        </div>
        <div className='qwer'>
          <h3 className="rgAddress mt-5">주소
            <span style={{color:'#f34336'}}>*</span>
          </h3>
          <div>
              <input 
                className="AddressWrite" 
                type='text' 
                name='Address' 
                value={Address} 
                onChange={onAddressHandler} 
                placeholder = "억까 못이김"
                />
          </div>
        </div>
        <div className='qwer'>
          <h3 className="rgPhoneNum mt-5">전화번호
            <span style={{color:'#f34336'}}>*</span>
          </h3>
          <div>
              <input 
                className="PhoneNumWrite" 
                type='text' 
                name='PhoneNum' 
                value={PhoneNum} 
                onChange={onPhoneNumHandler} 
                placeholder = "비싼 번호 줘서 감사함미다!"
                />
          </div>
        </div>
        <div className='qwer2'>
          <h3 className="rgEmail mt-5">이메일</h3>
          <div>
              <input 
                className="EmailWrite" 
                type='email' 
                name='Email' 
                value={Email} 
                onChange={onEmailHandler} 
                placeholder = "골뱅이 뺴먹지마"
                />
          </div>
        </div>
        <div className='qwer3'>
          <div className="rgbt">
             <button className="rgbutton" type='submit' onClick={onSubmit}>회원가입하기</button>
          </div>
        </div>
      </form>
    </div>

    
  )

}