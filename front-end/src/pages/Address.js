import React, {useState} from 'react'
import './Address.css';
import { Link } from 'react-router-dom';

export default function Address() {

    const [AddressDepart, setAddressDepart] = useState("")
    const [AddressDest, setAddressDest] = useState("")

    const onAddressDepartHandler = (event) => {
        setAddressDepart(event.currentTarget.value)
      }

      const onAddressDestHandler = (event) => {
        setAddressDepart(event.currentTarget.value)
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
                    <Link to="/">
                        <button 
                            className="button"
                            type='submit'
                            // onClick={onSubmit}
                        >🌸 꽃 선택하러 가기 🌸</button>
                    </Link>
                </div>
            </form>
        </div>
    

    )
}