import React from 'react'
import './OrderTable.css';
import { Link } from 'react-router-dom';



export default function OrderTable() {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh', overflow:'scroll'
        }}
    >

          <h1 class="register">마이페이지 - 주문내역
            <span style={{color:'#f34336', fontSize:10, paddingLeft:10}}> </span>
          </h1>

          <div class="date">8/12
            <span style={{color:'#f34336', fontSize:10, paddingLeft:10}}> </span>
          </div>
          <div class="registerbd"></div>       
          <div class="datebd"></div>            
          <div class="sidemenu">마이페이지</div>
          <div class="MyInfo">
            <Link to="/mypage">
            <button class="GoMyPage">내 정보</button>
            </Link>
          </div>

          <div class="fhouse">수수 꽃다리</div>
          
          <div class="box1"></div>
          <div class="sepbd"></div>
          <div class="info-name">품목</div>
          <div class="flower-name">빨간 장미</div>
          <div class="price-cnt">8,000원 / 1송이</div>
          <div class="info-bd"></div>
          <div class="info-product">화분</div>
          <div class="info-option">옵션</div>
          <div class="info-pick">포장</div>
          <div class="info-price-cnt">8,000원 X 2</div>
          <div class="info-price-cnt-bd"></div>
          <div class="total-price">총 16,000원</div>

          <div class="box2"></div>
          <div class="sepbd2"></div>
          <div class="info-name2">품목</div>
          <div class="flower-name2">튤립</div>
          <div class="price-cnt2">4,000원 / 1송이</div>
          <div class="info-bd2"></div>
          <div class="info-product2">화분</div>
          <div class="info-option2">옵션</div>
          <div class="info-pick2">포장</div>
          <div class="info-price-cnt2">4,000원 X 2</div>
          <div class="info-price-cnt-bd2"></div>
          <div class="total-price2">총 8,000원</div>

          <div class="finalbd"></div>
          <div class="finalcal">합계 24,000원</div>


          <div class="OrderTable">
            <Link to="/ordertable">
            <button class="GoOrderTable">주문 목록</button>
            </Link>
          </div>
      </div>
     
    )
  
  }