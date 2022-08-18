import React, {useState} from 'react'
import './Login.css';
import { Link } from "react-router-dom";

export default function Login() {
    const [Id, setId] = useState("")
    const [Password, setPassword] = useState("")

    const onIdHandler = (event) => {
        setId(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
        }}
    >
        <form 
            className="p-10 bg-white rounded-xl space-y-5" 
            action=""
            style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
        >
            <h1 className="login">로그인</h1>
            <img className="loginlogo" alt="symbol_temporary" src="/images/symbol.png" />
            <div className="loginbd">
            </div>
            <div className="ID">
                <label className="" htmlFor='id'>아이디</label>
                <input 
                    className="IDbox" 
                    type='text' 
                    name='id' 
                    value={Id} 
                    onChange={onIdHandler} 
                    placeholder="아이디를 입력해주세요!"
                />
            </div>
            <div className="PW">
                <label className="" htmlFor='pw'>비밀번호</label>
                <input 
                    className="PWbox" 
                    type='text' 
                    name='pw' 
                    value={Password} 
                    onChange={onPasswordHandler}
                    placeholder ="비밀번호를 입력해주세요!" 
                />
            </div>
            <div className="lgbt">
                <button className="button">로그인하기</button>
            </div>
            <div className="bt">
                <Link to="/register">
                <button className="GoRegister"><u>회원가입하기</u></button>
                </Link>
            </div>
        </form>
    </div>

    )
}