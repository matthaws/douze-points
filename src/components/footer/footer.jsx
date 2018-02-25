import React from 'react';
import './footer.css'


class Footer extends React.Component {
  render() {
    return (
      <main className='main--footer'>
        <div className='div--credits'>Created by Brendan Hamill, Matt Haws, and Ian Del Duca</div>
        <div className='div--copy'>{'{12} Douze Point! 2018'} &copy;</div>
      </main>
    )
  }

}

export default Footer;
