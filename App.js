import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import Router from './src/navigation/Router';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
      <FlashMessage position="top" />
    </>
  );
};

export default App;
