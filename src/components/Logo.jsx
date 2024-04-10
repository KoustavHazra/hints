import React from 'react'
import logoImage from "../../public/hints-logo.jpeg";

function Logo({width = '50px'}) {
  return (
    <div>
      <img src={logoImage} alt="Logo" style={{ width }} />
    </div>
  )
}

export default Logo
