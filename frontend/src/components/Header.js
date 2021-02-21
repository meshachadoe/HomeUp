import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <Link to="/"><h1>home <br/><span className="logo-blue">up</span></h1></Link>
        </header>
    )
}

export default Header
