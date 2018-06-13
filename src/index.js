import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/App';
import { Provider } from 'react-redux';
import { createOnStorage } from './redux/middleware';
import store from './redux/store';

const onStorage = createOnStorage(store);

window.addEventListener('storage', onStorage);

ReactDOM.render((
  <Provider store={store}>
    <Home />
  </Provider>
), document.getElementById('root'));
