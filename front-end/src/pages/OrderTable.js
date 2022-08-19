import React from 'react'
import './OrderTable.css';
import { Link } from 'react-router-dom';
import { useState } from 'react'

export default function OrderTable() {

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


	const HandleClickRadioButton = (e) => {
		console.log(e.target.value)
		setX(e.target.value)
	}

	return (
		<div style={{
			display: 'flex', justifyContent: 'center', alignItems: 'center',
			width: '100%', height: '100vh', overflow: 'scroll'
		}}
		>
			<form
				class="p-10 bg-white rounded-xl space-y-5"
				action=""
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={onSubmitHandler}
			>
				<h1 class="register">마이페이지 - 주문내역
					<span style={{ color: '#f34336', fontSize: 10, paddingLeft: 10 }}> </span>
				</h1>
				<div class="registerbd"></div>
				<h3 class="rgName">이름
				</h3>
				<div>
					<input
						class="NameWrite"
						type='text'
						name='Name'
						vlaue={Name}
						onChange={onNameHandler}
						placeholder=""
					/>
				</div>
				<h3 class="rgID">아이디
				</h3>
				<div>
					<input
						class="idwrite"
						type='text'
						name='Id'
						value={Id}
						onChange={onIdHandler}
						placeholder=""
					/>
				</div>
				<h3 class="rgPassword">비밀번호
				</h3>
				<div>
					<input
						class="PWwrite"
						type='text'
						name='Password'
						value={Password}
						onChange={onPasswordHandler}
						placeholder=""
					/>
				</div>

				<h3 class="rgAddress">주소
				</h3>
				<div>
					<input
						class="AddressWrite"
						type='text'
						name='Address'
						value={Address}
						onChange={onAddressHandler}
						placeholder=""
					/>
				</div>
				<h3 class="rgPhoneNum">전화번호
				</h3>
				<div>
					<input
						class="PhoneNumWrite"
						type='text'
						name='PhoneNum'
						value={PhoneNum}
						onChange={onPhoneNumHandler}
						placeholder=""
					/>
				</div>
				<h3 class="rgEmail">이메일</h3>
				<div>
					<input
						class="EmailWrite"
						type='email'
						name='Email'
						value={Email}
						onChange={onEmailHandler}
						placeholder=""
					/>
				</div>
				<div class="sidemenu">마이페이지</div>
				<div class="MyInfo">
					<Link to="/mypage">
						<button class="GoMyPage">내 정보</button>
					</Link>
				</div>

				<div class="OrderTable">
					<Link to="/ordertable">
						<button class="GoOrderTable">주문 목록</button>
					</Link>
				</div>

				<div class="rgbt">
					<button class="rgbutton">수정하기</button>
				</div>
			</form>
		</div>


	)

}


