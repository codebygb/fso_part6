import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const alter = (action) => {
    switch (action) {
      case "good":
        store.dispatch({
          type: "GOOD",
        });
        break;
      case "bad":
        store.dispatch({
          type: "BAD",
        });
        break;
      case "ok":
        store.dispatch({
          type: "OK",
        });
        break;
      case "reset":
        store.dispatch({
          type: "ZERO",
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button onClick={() => alter("good")}>good</button>
      <button onClick={() => alter("ok")}>ok</button>
      <button onClick={() => alter("bad")}>bad</button>
      <button onClick={() => alter("reset")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
