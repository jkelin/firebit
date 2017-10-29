import * as React from 'react';
import { render } from 'react-dom';
import { App } from './containers/App';
import { MockPasswordDB } from './passwordDB';
import { createFireBitStore } from './store/index';

import './styles/index.less';
import { createFireBitRouter } from 'router';

const db = new MockPasswordDB();
const router = createFireBitRouter();
const store = createFireBitStore(db, router);

router.start();

(window as any).firebit = {
  db,
  store,
  router,
};

const appContainer = document.getElementById('app-container');

function renderApp(AppComponent: typeof App) {
  render(<AppComponent passwordDB={db} store={store} router={router} />, appContainer);
}

renderApp(App);

const hot = (module as any).hot;
if (hot) {
  hot.accept(['./src/containers/App.tsx'], () => {
    const NextApp = require('./containers/App').App;
    renderApp(NextApp);
  });
}
