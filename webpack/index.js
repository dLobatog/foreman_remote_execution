import React from 'react';
import ReactDOM from 'react-dom';
import URI from 'urijs';
import { mount } from 'foremanReact/common/MountingService';
import componentRegistry from 'foremanReact/components/componentRegistry';
import JobInvocationContainer from './react_app/components/job_invocations';
import JobInvocationHostsTable from './react_app/components/job_invocations/HostsTable';
import './react_app/redux/reducers'

const rexComponents = [
  { name: 'JobInvocationContainer', type: JobInvocationContainer },
  { name: 'JobInvocationHostsTable', type: JobInvocationHostsTable }
]

componentRegistry.registerMultiple(rexComponents);

if(window.location.href.match(/job_invocations/)) {
  const jobInvocationId = parseInt(new URI(window.location.href).filename())
  mount('JobInvocationContainer',
        '#status_chart',
        {"url":"/job_invocations/chart?id="+jobInvocationId})
  mount('JobInvocationHostsTable',
        '#job_invocations_hosts_table',
        {"url":"/job_invocations/chart?id="+jobInvocationId})
}
