//import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import { addDoc, collection, doc, setDoc  } from 'firebase/firestore';
import { db, auth } from './config/firebaseConfig';
//import persistReducer from 'redux-persist/es/persistReducer';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({
      auth,
      db
    }))
  )
  );

  const persistor = persistStore(store)


ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
      </Provider>
    </React.StrictMode>,
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
