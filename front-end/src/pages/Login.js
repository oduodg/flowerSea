import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
	const [Id, setId] = useState('');
	const [Pw, setPw] = useState('');

	const handleId = (e) => {
			setId(e.target.value)
	};

	const handlePw = (e) => {
			setPw(e.target.value)
	};

	const onClickLogin = () => {
			console.log('click login')
	};

	// const domain = "http://192.168.35.160:8080/";

	// const option = {
	// 	url: domain + "api/userinfo/login",
	// 	method: "post",
	// 	data: {
	// 	},
	// 	responseType: 'json'
	// }

	// useEffect(() => { 
	// 		axios.get('/login')
	// 		.then(res => console.log(res))
	// 		.catch()
	// },
	// []);

	return (
		<div className='text-center'>
			<p className='pt-10 text-xl'>로그인</p>
			
			<div className='pt-10'>
				<label className='pr-2' htmlFor='id'>아이디</label>
				<input className='border-2 rounded-lg' type='text' name='id' vlaue={Id} onChange={handleId} />
			</div>

			<div className='pt-10'>
				<label className='pr-2' htmlFor='pw'>비밀번호</label>
				<input className='border-2 rounded-lg' type='text' name='pw' vlaue={Pw} onChange={handlePw} />
			</div>
			
			<div className='pt-10'>
				<button className='px-20 text-blue-400 border-2 border-blue-400 rounded-lg' onClick={onClickLogin}>로그인하기</button>
			</div>
		</div>
	)
}
