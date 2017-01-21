import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { actions } from '../../data/api';
import BackButton from '../../components/BackButton';
import PageTitle from '../../components/PageTitle';
import DesignForm from '../../components/DesignForm';

class DesignNew extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSuccess(response) {
    this.props.dispatch(actions.getAllDesign());
    const { slug } = response.data;
    this.props.router.push(`/design/${slug}`);
  }

  onError() {
  }

  render() {
    return (
      <div>
        <BackButton url={'/design'} />
        <PageTitle title={'Add Design Project'} />

        <DesignForm
          project={this.props.project}
          endpoint={'/design'}
          token={this.props.token}
          onSuccess={this.onSuccess}
          onError={this.onError}
        />
      </div>
    );
  }
}

DesignNew.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.object,
  project: PropTypes.object,
  token: PropTypes.string
};

DesignNew.defaultProps = {
  project: {
    title: '',
    slug: '',
    date: '',
    excerpt: '',
    raw: '',
    images: []
  }
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default withRouter(connect(mapStateToProps)(DesignNew));
