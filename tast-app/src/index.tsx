import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './components/App'



const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>

);

