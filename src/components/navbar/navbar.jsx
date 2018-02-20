import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/douzepointlogo.png';
import './navbar.css'


class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <main className='main--navbar'>
        <Link className='Link--logo' to='/home' >{'{12} Douze Points!'}</Link>
        <Link className='Link--scoresheets' to='/scoresheets'>Scorsheets</Link>
        <Link className='Link--contests' to='/contests'>Contests</Link>
        <Link className='Link--home' to='/'>Home</Link>
        <Link className="Link--logout" to='/'>Logout</Link>
      </main>
    )
  }

}

export default Navbar;
// <img className='img--logo' src={Logo} />
