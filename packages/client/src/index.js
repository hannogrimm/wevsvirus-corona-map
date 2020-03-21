import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./i18n";

require("dotenv").config();

ReactDOM.render(
  <Suspense fallback={<div>Loading... </div>}>
    <App />
  </Suspense>,
  document.getElementById("root")
);

serviceWorker.unregister();
