import {configureStore} from '@reduxjs/toolkit';
import issueReducer from '../features/issues/issueSlice';

const store = configureStore({
    reducer: {
        issue: issueReducer
    },
});

export default store;