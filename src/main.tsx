import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { setToken } from "./features/auth/authSlice";
import App from "./App";
import "./index.css";

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(setToken(token));
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  
);
