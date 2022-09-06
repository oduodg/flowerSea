import React from 'react'
import './Payed.css';
import { Link } from 'react-router-dom';


export default function Payed() {
return(
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
        }}
    >
        <form 
            className="p-10 bg-white rounded-xl space-y-5" 
            action=""
            style={{ display: 'flex', flexDirection: 'column'}}
            //onSubmit={onSubmitHandler}
        >
            <h1 className="payed">결제 완료</h1>
            <h1 className="again">
                다음에도 저희 꽃바다 서비스를 이용해주세요</h1>
            <div className="pybt">
            <Link to="/">
                <button className="pybutton">초기화면으로가기</button>
            </Link>
          </div>
        </form>
    </div>
)
}