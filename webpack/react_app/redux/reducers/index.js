import { combineReducers } from 'redux';
import { registerReducer } from 'foremanReact/common/MountingService';
import job_invocations from './job_invocations';

const rootReducer = combineReducers({
  job_invocations,
});

registerReducer('foreman_remote_execution_reducers', rootReducer);
