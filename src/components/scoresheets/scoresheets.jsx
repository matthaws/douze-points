import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


//=========================================
// props / actions

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {

};

//=========================================
// component

class Scoresheets extends React.Component {

  static propTypes = {

  }

  static defaultProps = {
    scoresheet: {
      
    }
  }

  constructor(props) {
    super(props);

  }

  render() {
    return(
      <section className="section--scoresheets_container">
        <nav className="nav--scoresheets_nav">
        </nav>
        <h1>
          Scoresheet goes here.
        </h1>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoresheets);
