import * as React from 'react';
import { render } from 'react-dom';
import { MockPasswordDB } from './passwordDB';
import { App } from "./components/App";
import { createFireBitStore } from "./store/index";

const db = new MockPasswordDB();
const store = createFireBitStore();

(window as any).firebit = {
  db,
  store
};

const appContainer = document.getElementById('app-container');

render(<App passwordDB={db} store={store} />, appContainer);

const hot = (module as any).hot;
if (hot) {
  hot.accept(['./src/components/App.tsx'], () => {
    const NextApp = require('./components/App').App;
    render(<NextApp passwordDB={db} store={store} />, appContainer);
  });
}
