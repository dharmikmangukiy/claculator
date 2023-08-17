import React from 'react'

function Header() {
  return (
    <div class="nav">
    <input type="checkbox" id="nav-check"/>
    <div class="nav-header">
      <div class="nav-title">
        Calculator
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    
    <div class="nav-links">
      <a href="/Sip">SIP Calculator</a>

      <a href="/Calc">Loan Calculator</a>
    </div>
  </div>
  )
}

export default Header