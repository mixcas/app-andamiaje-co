import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMiembros, setError } from '../actions/miembrosActions';
import { logout } from '../actions/member';

class MiembrosContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    miembros: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      miembros: PropTypes.array.isRequired,
    }).isRequired,
    member: PropTypes.object.isRequired,
    getMiembros: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchMiembros();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchMiembros = () => this.props.getMiembros()
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    })

  render = () => {
    const {
      Layout, miembros, member, match, logout,
    } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        miembroId={id}
        miembros={miembros.miembros}
        member={member}
        logout={logout}
        error={miembros.error}
        loading={miembros.loading}
        reFetch={() => this.fetchMiembros()}
      />
    );
  }
}

const mapStateToProps = state => ({
  miembros: state.miembros || {},
  member: state.member || {},
});

const mapDispatchToProps = {
  getMiembros,
  setError,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MiembrosContainer);
