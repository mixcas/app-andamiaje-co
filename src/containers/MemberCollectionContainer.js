import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCollectionLotes, setError as setLotesCollectionError } from '../actions/collectionActions';
import { getObras, setError as setObrasError } from '../actions/obrasActions';

class MemberCollectionContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func,
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    obras: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      obras: PropTypes.array.isRequired,
    }).isRequired,
    getCollectionLotes: PropTypes.func.isRequired,
    setLotesCollectionError: PropTypes.func.isRequired,
    getObras: PropTypes.func.isRequired,
    setObrasError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => this.fetchLotesAndObras()

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchLotesAndObras = () => {
    return this.props.getCollectionLotes(this.props.collection)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setLotesCollectionError(err);
      })
      .then(this.props.getObras)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setObrasError(err);
      })
  }

  render = () => {
    const { Layout, lotes } =  this.props;

    return (
      <Layout
        error={lotes.error}
        loading={lotes.loading}
        reFetch={() => this.fetchLotesAndObras()}
        lotes={lotes.lotes}
      />
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.collection || {},
  obras: state.obras || [],
  member: state.member || {},
});

const mapDispatchToProps = {
  getCollectionLotes,
  setLotesCollectionError,
  getObras,
  setObrasError,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberCollectionContainer);
