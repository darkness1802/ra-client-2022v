import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import './index.css';
import Main from './Main';
import { RecoilRoot } from 'recoil';
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
	  <RecoilRoot>
      	<Main />
	  </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
