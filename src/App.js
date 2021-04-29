import React, { useState } from "react";
import Final from "./components/Final";
import Form from "./components/Form";
import Header from "./components/Header";
import Words from "./components/Words";

function App() {
  const [settings, setSettings] = useState();
  const [status, setStatus] = useState(1);
  const onSubmit = (data) => {
    setSettings(data);
    changeStatus();
  };
  const toStart = () => setStatus(1);
  const changeStatus = () => setStatus(status + 1);
  return (
    <div className="App">
      <Header status={status} />

      {status === 1 && <Form onSubmit={onSubmit} />}
      {status === 2 && (
        <Words
          changeStatus={changeStatus}
          toStart={toStart}
          settings={settings}
        />
      )}
      {status === 3 && <Final />}
    </div>
  );
}

export default App;
