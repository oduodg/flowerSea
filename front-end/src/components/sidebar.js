import React from 'react'

export default function Sidebar() {
	return (
		<>
			<div className='fixed z-10 h-full text-2xl font-normal bg-white'>
				<div className='flex mx-5 mt-5'>
					<div>어서오세요!<br />
						내 손 안의 꽃집, <span className='font-bold'>꽃바다</span>입니다.</div>
					<img className="w-16" alt="symbol" src='/images/symbol.png' />
				</div>
			</div>
		</>
	)
}