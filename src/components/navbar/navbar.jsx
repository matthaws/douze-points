import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/douzepointlogo.png';


class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <main className='main--navbar'>
        <img className='img--logo' src={Logo} />
        <Link className='Link--scoresheets' to='/scoresheets'>Scorsheets</Link>
        <Link className='Link--contests' to='/contests'>Contests</Link>
        <Link className='Link--home' to='/'>Home</Link>
        <Link className="Link--logout" to='/'>Logout</Link>
      </main>
    )
  }

}

export default Navbar;