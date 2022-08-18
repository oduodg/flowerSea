import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';
import './Login.css';

export default function Login() {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const handleId = (e) => {
		setId(e.target.value)
	};

	const handlePw = (e) => {
		setPw(e.target.value)
	};

	const domain = "http://192.168.35.160:8080/";
	const userData = {
		username: id,
		password: pw
	}

	const onSubmit = async () => {
		try {
			if (id === "" || pw === "") {
				alert("아이디와 비밀번호를 입력해주세요.");
				return;
			}
			const res = await axios.post(domain + "api/userinfo/login/", userData);
			// 쿠키와 store에 Token 저장
			setRefreshToken(res.data.token);
			dispatch(SET_TOKEN(res.data.token));
			//console.log("로그인 성공");
			return navigate("/");
		} catch (err) {
			// console.log(err);
			if (err.response.status === 400) {
				alert("아이디와 비밀번호를 확인해주세요.");
			} else {
				alert("서버 에러입니다.");
			}
		}
	}

	return (

		<div style={{
			display: 'flex', justifyContent: 'center', alignItems: 'center',
			width: '100%', height: '100vh'
			}}
		>
			<form 
				class="p-10 bg-white rounded-xl space-y-5" 
				action=""
				style={{ display: 'flex', flexDirection: 'column'}}
				onSubmit={onSubmit}
			>
				<h1 class="login">로그인</h1>
				<img className="loginlogo" alt="symbol_temporary" src="/images/symbol.png" />
				<div class="loginbd">
				</div>
				<div class="ID">
					<label class="" htmlFor='id'>아이디</label>
					<input 
						class="IDbox" 
						type='text' 
						id = 'id'
						name='id' 
						value={id} 
						onChange={handleId} 
						placeholder="아이디를 입력해주세요!"
					/>
				</div>
				<div class="PW">
					<label class="" htmlFor='pw'>비밀번호</label>
					<input 
						class="PWbox" 
						type='password' 
						id='pw'
						name='pw' 
						value={pw} 
						onChange={handlePw}
						placeholder ="비밀번호를 입력해주세요!" 
					/>
				</div>
				<div class="lgbt">
					<button 
						class="button"
						type="submit"
						onClick={onSubmit}
					>로그인하기</button>
				</div>
				<div class="bt">
					<Link to="/register">
					<button class="GoRegister"><u>회원가입하기</u></button>
					</Link>
				</div>
			</form>
		</div>
	
	)
}
