import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const navigate = useNavigate();

	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const handleId = (e) => {
		setId(e.target.value);
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
			localStorage.setItem("userToken", res.data.token);
			localStorage.setItem("userName", res.data.name);
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
		<div className='text-center'>
			<p className='pt-10 text-xl'>로그인</p>

			<div className='pt-10'>
				<label className='pr-2' htmlFor='id'>아이디</label>
				<input className='border-2 rounded-lg' type='text' id='id' name='id' value={id} onChange={handleId} />
			</div>

			<div className='pt-10'>
				<label className='pr-2' htmlFor='pw'>비밀번호</label>
				<input className='border-2 rounded-lg' type='password' id='pw' name='pw' value={pw} onChange={handlePw} />
			</div>

			<div className='pt-10'>
				<button className='px-20 text-blue-400 border-2 border-blue-400 rounded-lg' type='submit' onClick={onSubmit}>로그인하기</button>
			</div>
			<Link to='/register'>
				<button type='button'>회원가입하기</button>
			</Link>
		</div>
	)
};
export default Login;