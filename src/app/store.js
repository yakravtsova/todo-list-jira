import {configureStore} from '@reduxjs/toolkit';
import issueReducer from '../features/issues/issueSlice';
import projectSlice from '../features/projects/projectSlice';
import statusSlice from '../features/statuses/statusSlice';

const store = configureStore({
    reducer: {
        issue: issueReducer,
        project: projectSlice,
        status: statusSlice
    },
});

export default store;