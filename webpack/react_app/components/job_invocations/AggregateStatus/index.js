import React from 'react';

class AggregateStatus extends React.Component {
  render() {
    const {
      statuses,
    } = this.props;

    return (
      <div id="aggregate_statuses">
        <p className="card-pf-aggregate-status-notifications">
          <span className="card-pf-aggregate-status-notification">
            <a id='success_count'>
              <span className="pficon pficon-ok"></span>
              {statuses["success"]}
            </a>
          </span>
          <span className="card-pf-aggregate-status-notification">
            <a id='failed_count'>
              <span className="pficon pficon-error-circle-o"></span>
              {statuses["failed"]}
            </a>
          </span>
          <span className="card-pf-aggregate-status-notification">
            <a id='pending_count'>
              <span className="pficon pficon-running"></span>
              {statuses["pending"]}
            </a>
          </span>
          <span className="card-pf-aggregate-status-notification">
            <a id='cancelled_count'>
              <span className="pficon pficon-close"></span>
              {statuses["cancelled"]}
            </a>
          </span>
        </p>
      </div>
    );
  }
}

export default AggregateStatus;
