import React from 'react'
import "./sidebar.css";

export default function Sidebar_top() {
	return (
		<>
			<div className='flex mx-5 mt-20'>
				<div>어서오세요!<br />
					내 손 안의 꽃집, <span className='font-bold'>꽃바다</span>입니다.</div>
				<img className="w-16" alt="symbol" src='/images/symbol.png' />
			</div>
			<div className='flex mx-5 '>
				<span className='text-xs text-gray-400'>'꽃바다'와 함께 어디서든 편하게 꽃을 구매해 보세요!</span>
			</div>
			<div className='mt-5 line'></div>
		</>
	)
}
