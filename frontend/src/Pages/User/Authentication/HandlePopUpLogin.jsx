import React, {useEffect} from 'react'

const HandlePopUpLogin = () => {
  const onChangeHandler = () => {
    window.opener.postMessage("Failed", "http://localhost:3000/login");
  }
  useEffect(() => {
    const closePopUp = () => {
      if (!window.opener) {
        window.close();
      } else {
        onChangeHandler();
      }
    }
    closePopUp();
  }, []);
  return (
    <div className='flex justify-center items-center m-auto h-96 w-full'>
      <p className='text-red-600 font-bold'>Handle Login: Failed authentication!</p>
    </div>
  )
}

export default HandlePopUpLogin;