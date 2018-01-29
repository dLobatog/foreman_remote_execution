import { isNil } from 'lodash';

import {
  JOB_INVOCATIONS_GET_JOB_INVOCATIONS,
  JOB_INVOCATIONS_POLLING_STARTED,
} from '../../consts';

import API from 'foremanReact/API';

const defaultJobInvocationsPollingInterval = 10000;
const jobInvocationsInterval = isNil(process.env.JOB_INVOCATIONS_POLLING) ?
  defaultJobInvocationsPollingInterval :
  process.env.JOB_INVOCATIONS_POLLING;

const getJobInvocations = url => (dispatch) => {
  const isDocumentVisible =
    document.visibilityState === 'visible' ||
    document.visibilityState === 'prerender';

  if (isDocumentVisible) {
    API.get(url)
      .then(onGetJobInvocationsSuccess)
      .catch(onGetJobInvocationsFailed)
      .then(triggerPolling);
  } else {
    // document is not visible, keep polling without api call
    triggerPolling();
  }

  function onGetJobInvocationsSuccess({ data }) {
    dispatch({
      type: JOB_INVOCATIONS_GET_JOB_INVOCATIONS,
      payload: {
        jobInvocations: data
      },
    });
  }

  function onGetJobInvocationsFailed(error) {
    if (error.response.status === 401) {
      window.location.replace('/users/login');
    }
  }

  function triggerPolling() {
    if (jobInvocationsInterval) {
      setTimeout(() => dispatch(getJobInvocations(url)), jobInvocationsInterval);
    }
  }
};

export const startJobInvocationsPolling = url => (dispatch, getState) => {
  if (getState().foreman_remote_execution_reducers.job_invocations.isPolling) {
    return;
  }
  dispatch({
    type: JOB_INVOCATIONS_POLLING_STARTED,
  });
  dispatch(getJobInvocations(url));
};
