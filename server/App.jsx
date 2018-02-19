import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';

const App = () => (
  <Provider store={store}>

  </Provider>
);

render(App,document.getElementById('root'));
