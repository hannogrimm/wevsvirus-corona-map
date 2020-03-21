import React from "react";
import { useTranslation } from "react-i18next";
import Map from "./Map";

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <p>{t("hello")}</p>

        <Map />
      </header>
    </div>
  );
};

export default App;
