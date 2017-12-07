import { groupBy, isUndefined } from 'lodash';
import { connect } from 'react-redux';
import React from 'react';
import PieChart from 'foremanReact/components/common/charts/PieChart';
import AggregateStatus from './AggregateStatus/index.js';

import * as JobInvocationActions from '../../redux/actions/job_invocations';

class JobInvocationContainer extends React.Component {
  componentDidMount() {
    const { startJobInvocationsPolling, data: { url } } = this.props;

    startJobInvocationsPolling(url);
  }

  render() {
    const {
      job_invocations,
      statuses,
    } = this.props;

    return (
      <div id="job_invocations_chart_container">
        <PieChart
          data={job_invocations}
        />
        <AggregateStatus
          statuses={statuses}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    job_invocations,
    statuses,
  } = state.foreman_remote_execution_reducers.job_invocations;

  return {
    job_invocations: job_invocations,
    statuses: statuses,
  };
};

export default connect(mapStateToProps, JobInvocationActions)(JobInvocationContainer);
