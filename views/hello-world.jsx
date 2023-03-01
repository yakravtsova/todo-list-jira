import React from 'react';
import App from "./App";
import store from '../src/app/store';
import {Provider} from 'react-redux';

export default function HelloWorld() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
