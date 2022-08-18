import React from 'react'
import './sidebar.css';
import { Link } from "react-router-dom";

export default function Sidebar() {
	return (
		<div className='absolute mt-11 z-10 h-full text-2xl overflow-auto font-normal bg-white'>
			<div className='flex mx-5 mt-5'>
				<div>어서오세요!<br />
					내 손 안의 꽃집, <span className='font-bold'>꽃바다</span>입니다.</div>
				<img className="w-16" alt="symbol" src='/images/symbol.png' />
			</div>
			<div className='flex mx-5 '>
				<span className='text-xs text-gray-400'>'꽃바다'와 함께 어디서든 편하게 꽃을 구매해 보세요!</span>
			</div>
			<div className='flex ml-52 mt-12'>
				<Link to="/login">
					<button className="loginbutton">로그인하기</button>
				</Link>
				<Link to="/register">
					<button className="loginbutton ml-1">회원가입하기</button>
				</Link>
			</div>
			<div className='line mt-5'></div>
			<div className='flowerbuy mt-14'>꽃 구매, 어떤 방식을 원하세요?</div>
			<div className='flex mt-24'>
				<button className='deliverbutton'>배달</button>
				<button className='pickupbutton'>포장</button>
			</div>
			<div className='line'></div>
			<div className='font-bold text-sm ml-20 mt-28'>당신의 주변, 이렇게 많은 꽃집이 있답니다!</div>
			<div className='line mt-5'></div>
		</div>
	
	)
}