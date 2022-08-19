import React from 'react'
import './OrderTable.css';
import { Link } from 'react-router-dom';

export default function OrderTable() {
	
	return (
		<div style={{
			display: 'flex', justifyContent: 'center', alignItems: 'center',
			width: '100%', height: '100vh', overflow: 'scroll'
		}}
		>
				<h1 className="register">마이페이지 - 주문내역
					<span style={{ color: '#f34336', fontSize: 10, paddingLeft: 10 }}> </span>
				</h1>

				<div className="sidemenu">마이페이지</div>
				<div className="MyInfo">
					<Link to="/mypage">
						<button className="GoMyPage">내 정보</button>
					</Link>
				</div>

				<div className="OrderTable">
					<Link to="/ordertable">
						<button className="GoOrderTable">주문 목록</button>
					</Link>
				</div>

		</div>
	)
}


