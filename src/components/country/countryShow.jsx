import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { startSpinner, endSpinner } from "../../actions/uiActions";
import { withRouter, Link } from "react-router-dom";
import { fetchCountryDetails } from "../../actions/countryActions";
import EntryIndexItem from "../entries/entryIndexItem";
import "./countryShow.css";

class CountryShow extends React.Component {
  componentDidMount() {
    if (this.props.country.id) {
      this.props.fetchCountryDetails(this.props.country.id);
    }
    this.props.startSpinner();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.country.entry_ids && nextProps.country.entry_ids) {
      this.props.endSpinner();
    } else if (!this.props.country.id && nextProps.country.id) {
      this.props.fetchCountryDetails(nextProps.country.id);
    }
  }

  render() {
    const { country, entries } = this.props;
    return (
      <section className="section--countryShow">
        <h1 className="h1--country--name">{country.name}</h1>
        <img className="img--country--flag" src={country.flag_url} />
        <ul className="ul--entry-list">
          {entries.map(entry => (
            <li>
              <p>{entry.year}{" "}
              {country.hosted_years && country.hosted_years.includes(entry.year)
                ? "(Host Country)"
                : ""}{" "}:
              </p>
             <EntryIndexItem entry={entry} country={country} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

CountryShow.defaultProps = {
  country: {
    flag_url: ""
  }
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.name;
  const country = selectCountryBySlug(slug, Object.values(state.countries));
  const entries =
    country && country.entry_ids
      ? country.entry_ids.map(id => state.entries[id])
      : [];
  return {
    country,
    entries
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCountryDetails: countryId => dispatch(fetchCountryDetails(countryId)),
  startSpinner: () => dispatch(startSpinner()),
  endSpinner: () => dispatch(endSpinner())
});

const selectCountryBySlug = (slug, countries) => {
  const countryName = slug
    .split("-")
    .map(word => {
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
  let targetCountry;
  countries.forEach(country => {
    if (country.name === countryName) {
      targetCountry = country;
    }
  });
  return targetCountry;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CountryShow)
);
