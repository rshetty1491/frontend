import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './containers/App';

// setting up store and middleware section for redux for saga

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import reducers from './store/reducers';
import rootSaga  from './store/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <App />
    </Provider>
);

