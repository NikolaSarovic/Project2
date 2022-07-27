import React from "react"
import '../style/headerStyle.css'
import { Link } from 'react-router-dom'

function Header() {

    return (
        <div className="header">
          <Link  to="/loginForm">Prijava</Link>
        </div>
    )
}
export default Header