import React, {useState} from 'react'
import './Address.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Address() {

    const navigate = useNavigate();
    // const domain = "http://127.0.0.1:8000/";
    const domain = "http://3.38.97.195/";

    const [AddressDepart, setAddressDepart] = useState("")
    const [AddressDest, setAddressDest] = useState("")

    const onAddressDepartHandler = (event) => {
        setAddressDepart(event.currentTarget.value)
      }

    const onAddressDestHandler = (event) => {
        setAddressDest(event.currentTarget.value)
      }

    const userData = {
		depart:AddressDepart,
        dest:AddressDest
	} 

    const onSubmit = async () => {
		try {
            if (AddressDest === "" && AddressDepart !== "") {
				alert("도착지를 입력해주세요!");
				return;
			}
            else if (AddressDepart === "" && AddressDest !== "") {
				alert("출발지를 입력해주세요!");
				return;
			}
			else if (AddressDepart === "" || AddressDest === "") {
				alert("주소를 입력해주세요!");
				return;
			}
            
			axios.post(domain + "api/pickuplocation/", userData);
			return navigate("/");
		} catch (err) {
			// console.log(err);
			if (err.response.status === 400) {
				alert("다 적어주라니깐!!!!");
			} else {
				alert("서버 에러입니다.");
			}
		}
	}

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
            >
                <h1 className="addrinput">주소를 입력 해주세요!</h1>
                <img className="addrlogo" alt="symbol_temporary" src="/images/symbol.png" />
                <div className="addrbd"></div>
                <h3 className="Depart">출발지 입력</h3>
                <div>
                    <input 
                        className="DepartWrite" 
                        type='text' 
                        name='AddressDepart' 
                        value={AddressDepart} 
                        onChange={onAddressDepartHandler} 
                        placeholder = "멋사 10기"
                    />
                </div>
                <h3 className="Dest">도착지 입력</h3>
                <div>
                    <input 
                        className="DestWrite" 
                        type='text' 
                        name='AddressDest' 
                        value={AddressDest} 
                        onChange={onAddressDestHandler} 
                        placeholder = "해커톤 화잇팅🙌"
                    />
                </div>
                <div className="bt">
                    <button 
                        className="button"
                        type='submit'
                        onClick={onSubmit}
                    >🌸 꽃 선택하러 가기 🌸</button>
                </div>
            </form>
        </div>
    

    )
}