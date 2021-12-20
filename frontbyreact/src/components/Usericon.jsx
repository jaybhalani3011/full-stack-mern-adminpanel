import React from 'react'
import imgpath from "../resetpassword.png";
function Usericon() {
  return (
    <>
      <i className="fas fa-users"></i>&nbsp;&nbsp;
    </>
  )
}

function Passwordicon() {
  return (
    <>
      <img src={imgpath} height={15} width={15}/>
      &nbsp;&nbsp;
    </>
  )
}

export { Usericon, Passwordicon };