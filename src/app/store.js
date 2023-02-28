import {configureStore} from '@reduxjs/toolkit';
import issueReducer from '../features/issues/issueSlice';
import projectSlice from '../features/projects/projectSlice';

const store = configureStore({
    reducer: {
        issue: issueReducer,
        project: projectSlice
    },
});

export default store;