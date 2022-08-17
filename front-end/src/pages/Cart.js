import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';

export default function Cart() {
  let basket = {
		totalCount: 0, 
		totalPrice: 0,
		//체크한 장바구니 상품 비우기
		delCheckedItem: function(){
			document.querySelectorAll("input[name=buy]:checked").forEach(function (item) {
				item.parentElement.parentElement.parentElement.remove();
			});
			//AJAX 서버 업데이트 전송
		
			//전송 처리 결과가 성공이면
			this.reCalc();
			this.updateUI();
		},
		//장바구니 전체 비우기
		delAllItem: function(){
			document.querySelectorAll('.row.data').forEach(function (item) {
				item.remove();
			  });
			  //AJAX 서버 업데이트 전송
			
			  //전송 처리 결과가 성공이면
			  this.totalCount = 0;
			  this.totalPrice = 0;
			  this.reCalc();
			  this.updateUI();
		},
		//재계산
		reCalc: function(){
			this.totalCount = 0;
			this.totalPrice = 0;
			document.querySelectorAll(".p_num").forEach(function (item) {
				if(item.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.checked == true){
					var count = parseInt(item.getAttribute('value'));
					this.totalCount += count;
					var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
					this.totalPrice += count * price;
				}
			}, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
		},
		//화면 업데이트
		updateUI: function () {
			document.querySelector('#sum_p_num').textContent = '상품갯수: ' + this.totalCount.formatNumber() + '개';
			document.querySelector('#sum_p_price').textContent = '합계금액: ' + this.totalPrice.formatNumber() + '원';
		},
		//개별 수량 변경
		// changePNum: function (pos) {
		//     var item = document.querySelector('input[name=p_num'+pos+']');
		//     var p_num = parseInt(item.getAttribute('value'));
		//     var newval = event.target.classList.contains('up') ? p_num+1 : event.target.classList.contains('down') ? p_num-1 : event.target.value;
			
		//     if (parseInt(newval) < 1 || parseInt(newval) > 99) { return false; }
	
		//     item.setAttribute('value', newval);
		//     item.value = newval;
	
		//     var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
		//     item.parentElement.parentElement.nextElementSibling.textContent = (newval * price).formatNumber()+"원";
		//     //AJAX 업데이트 전송
	
		//     //전송 처리 결과가 성공이면    
		//     this.reCalc();
		//     this.updateUI();
		// },
		checkItem: function () {
			this.reCalc();
			this.updateUI();
		},
		// delItem: function () {
		//     event.target.parentElement.parentElement.parentElement.remove();
		//     this.reCalc();
		//     this.updateUI();
		// }
	}
	
		// 숫자 3자리 콤마찍기
		Number.prototype.formatNumber = function(){
			if(this==0) return 0;
			let regex = /(^[+-]?\d+)(\d{3})/;
			let nstr = (this + '');
			while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
			return nstr;
		};
	  return (
		<form name="orderform" id="orderform" method="post" class="orderform" action="/Page" onsubmit="return false;">
		
				<input type="hidden" name="cmd" value="order" />
				<div class="basketdiv" id="basket">
					<div class="img flex-auto mr-0"><img src="./images/cart.png" width="60" /></div>
					<h1 class="f text-3xl m-4 mb-8 flex-auto">장바구니</h1>
					<h1 class="f text-2xl pl-4 m-4 border-b-4 ">홍익꽃집</h1>
					<div class="row head ">
						<div class="subdiv">
							<div class="check">선택</div>
							<div class="img">이미지</div>
							<div class="pname">상품명</div>
						</div>
						<div class="subdiv">
							<div class="basketprice">한 송이 당 가격</div>
							<div class="num">수량</div>
							<div class="sum">합계</div>
						</div>
						<div class="subdiv">
		
							<div class="basketcmd">삭제</div>
						</div>
						<div class="split"></div>
					</div>
			
					<div class="row data">
						<div class="subdiv">
							<div class="check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();" />&nbsp;</div>
							<div class="img"><img src="./images/rose.jpeg" width="60" /></div>
							<div class="pname">
								<span class="text-center justify-center">장미</span>
							</div>
						</div>
						<div class="subdiv">
							<div class="basketprice"><input type="hidden" name="p_price" id="p_price1" class="p_price" value="5000" />5,000원</div>
							<div class="num">
								<div class="updown">
									<input type="text" name="p_num1" id="p_num1" size="2" maxlength="4" class="p_num" value="5" onkeyup="javascript:basket.changePNum(1);" />
									<span onclick="javascript:basket.changePNum(1);"><i class="fas fa-arrow-alt-circle-up up"></i></span>
									<span onclick="javascript:basket.changePNum(1);"><i class="fas fa-arrow-alt-circle-down down"></i></span>
								</div>
							</div>
							<div class="sum">25,000원</div>
						</div>
						<div class="subdiv">
							<div class="basketcmd"><a href="javascript:void(0)" class="abutton" onclick="javascript:basket.delItem();">삭제</a></div>
						</div>
					</div>
					<div class="row data">
						<div class="subdiv">
							<div class="check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();" />&nbsp;</div>
							<div class="img"><img src="./images/tulip.jpeg" width="60" /></div>
							<div class="pname">
								<span class="text-center justify-center">튤립</span>
							</div>
						</div>
						<div class="subdiv">
							<div class="basketprice"><input type="hidden" name="p_price" id="p_price1" class="p_price" value="7000" />7,000원</div>
							<div class="num">
								<div class="updown">
									<input type="text" name="p_num1" id="p_num1" size="2" maxlength="4" class="p_num" value="3" onkeyup="javascript:basket.changePNum(1);" />
									<span onclick="javascript:basket.changePNum(1);"><i class="fas fa-arrow-alt-circle-up up"></i></span>
									<span onclick="javascript:basket.changePNum(1);"><i class="fas fa-arrow-alt-circle-down down"></i></span>
								</div>
							</div>
							<div class="sum">21,000원</div>
						</div>
						<div class="subdiv">
							<div class="basketcmd"><a href="javascript:void(0)" class="abutton" onclick="javascript:basket.delItem();">삭제</a></div>
						</div>
					</div>
					<div class="row data">
						<div class="subdiv">
							<div class="check"><input type="checkbox" name="buy" value="260" checked="" onclick="javascript:basket.checkItem();" />&nbsp;</div>
							<div class="img"><img src="./images/mistflower.jpeg" width="60" /></div>
							<div class="pname">
								<span class="text-center justify-center">안개꽃</span>
							</div>
						</div>
						<div class="subdiv">
							<div class="basketprice"><input type="hidden" name="p_price" id="p_price1" class="p_price" value="3000" />3,000원</div>
							<div class="num">
								<div class="updown">
									<input type="text" name="p_num1" id="p_num1" size="2" maxlength="4" class="p_num" value="10" onkeyup="javascript:basket.changePNum(1);" />
									<span onclick="javascript:basket.changePNum(1);"><i class="fas fa-arrow-alt-circle-up up"></i></span>
									<span onclick="javascript:basket.changePNum(1);"><i class="fas fa-arrow-alt-circle-down down"></i></span>
								</div>
							</div>
							<div class="sum">30,000원</div>
						</div>
						<div class="subdiv">
							<div class="basketcmd"><a href="javascript:void(0)" class="abutton" onclick="javascript:basket.delItem();">삭제</a></div>
						</div>
					</div>
				</div>
				
				<div class="right-align basketrowcmd">
					<a href="javascript:void(0)" class="abutton" onclick="javascript:basket.delCheckedItem();">선택상품삭제</a>
					<a href="javascript:void(0)" class="abutton" onclick="javascript:basket.delAllItem();">장바구니비우기</a>
				</div>
		
				<div class="bigtext right-align sumcount" id="sum_p_num">상품갯수: 3개</div>
				<div class="bigtext right-align box blue summoney" id="sum_p_price">합계금액: 76,000원</div>
		
				<div id="goorder" class="">
					<div class="clear"></div>
					<div class="buttongroup center-align cmd">
						<a href="javascript:void(0);">선택한 상품 주문</a>
					</div>
				</div>
			</form>
	  )
	}
	