import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';

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
			const res = await axios.post(domain + "api/userinfo/login/", userData);
			// 쿠키와 store에 Token 저장
			setRefreshToken(res.data.token);
			dispatch(SET_TOKEN(res.data.token));
			//console.log("로그인 성공");
			return navigate("/");
		} catch (err) {
			// console.log(err);
			if(err.response.status === 400){
				alert("아이디와 비밀번호를 확인해주세요.");
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
		</div>
	)
}