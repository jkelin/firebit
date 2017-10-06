import * as React from "react";
import { render } from "react-dom";
import { App } from "./containers/App";
import { MockPasswordDB } from "./passwordDB";
import { createFireBitStore } from "./store/index";

import "./styles/index.less";

const db = new MockPasswordDB();
const store = createFireBitStore(db);

(window as any).firebit = {
  db,
  store,
};

const appContainer = document.getElementById("app-container");

render(<App passwordDB={db} store={store} />, appContainer);

const hot = (module as any).hot;
if (hot) {
  hot.accept(["./src/containers/App.tsx"], () => {
    const NextApp = require("./containers/App").App;
    render(<NextApp passwordDB={db} store={store} />, appContainer);
  });
}
