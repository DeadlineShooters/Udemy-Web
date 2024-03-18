import React, { useEffect } from 'react'

const HandlePopUpLogin = () => {
    useEffect(() => {
        if (!window.opener) {
            window.close();
        }
    });
    const onChangeHandler = () => {
        const {value} = "Click";
        window.opener.postMessage("Exit", "http://localhost:3000/login");
    }
  return (
    <div>
        LoginSuccess
        <button className='p-5 bg-fuchsia-600' onClick={onChangeHandler}>Click</button>
    </div>
  )
}

export default HandlePopUpLogin;