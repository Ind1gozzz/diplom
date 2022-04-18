import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import App from './App';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value = {{
    user: new UserStore(),
    device: new DeviceStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
