import React from 'react';
import ReactDOM from 'react-dom';
import URI from 'urijs';
import { mount } from 'foremanReact/common/MountingService';
import componentRegistry from 'foremanReact/components/componentRegistry';
import JobInvocationContainer from './react_app/components/job_invocations';
import './react_app/redux/reducers'

componentRegistry.register(
  { name: 'JobInvocationContainer', type: JobInvocationContainer}
);

if(window.location.href.match(/job_invocations/)) {
  const jobInvocationId = parseInt(new URI(window.location.href).filename())
  mount('JobInvocationContainer',
        '#status_chart',
        {"url":"/job_invocations/chart?id="+jobInvocationId})
}
