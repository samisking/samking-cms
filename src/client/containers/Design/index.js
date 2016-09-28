import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import { actions } from '../../data/api';
import PageTitle from '../../components/PageTitle';
import DesignPreview from '../../components/DesignPreview';
import styles from './Design.css';

class Design extends Component {
  componentDidMount() {
    this.props.dispatch(actions.getAllDesign());
  }

  render() {
    let design;
    if (this.props.design) {
      design = this.props.design.map(project => (
        <div key={project.id} className={styles.gridItem}>
          <DesignPreview
            url={`/design/${project.slug}`}
            title={project.title}
            date={project.date}
            excerpt={project.excerpt}
          />
        </div>
      ));
    }

    let component;
    if (this.props.children) {
      component = this.props.children;
    } else {
      component = (
        <div>
          <PageTitle title={'All Design Projects'} />
          <div className={styles.grid}>
            <div className={styles.addNewContainer}>
              <Link to="/design/new" className={styles.addNewButton}>
                <span className={styles.addNewContent}>{'+'}</span>
              </Link>
            </div>
            {design}
          </div>
        </div>
      );
    }

    return (
      <div>{component}</div>
    );
  }
}

function mapStateToProps(state) {
  const {
    design
  } = state.api;

  return {
    design
  };
}

Design.propTypes = {
  children: PropTypes.node,
  dispatch: PropTypes.func,
  design: PropTypes.array
};

export default connect(mapStateToProps)(Design);
