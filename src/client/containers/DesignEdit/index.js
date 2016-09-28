import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import { actions } from '../../data/api';
import BackButton from '../../components/BackButton';
import PageTitle from '../../components/PageTitle';
import DesignForm from '../../components/DesignForm';

class DesignEdit extends Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onError = this.onError.bind(this);
  }

  onSuccess() {
    this.props.dispatch(actions.getAllDesign());
  }

  onDelete() {
    this.props.dispatch(actions.getAllDesign());
    this.props.router.push('/design');
  }

  onError() {
  }

  render() {
    return (
      <div>
        <BackButton url={'/design'} />
        <PageTitle title={`Edit “${this.props.project.title}”`} />

        <DesignForm
          project={this.props.project}
          endpoint={`/design/${this.props.project.id}`}
          buttonText={'Update Project'}
          onSuccess={this.onSuccess}
          onDelete={this.onDelete}
          onError={this.onError}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { design } = state.api;

  return {
    project: design.find(p => p.slug === ownProps.params.slug)
  };
}

DesignEdit.propTypes = {
  dispatch: PropTypes.func,
  router: PropTypes.object,
  project: PropTypes.object
};

DesignEdit.defaultProps = {
  project: {
    title: '',
    slug: '',
    date: '',
    excerpt: '',
    raw: '',
    images: []
  }
};

export default withRouter(connect(mapStateToProps)(DesignEdit));
