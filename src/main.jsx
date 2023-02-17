import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TransactionProvider } from "./context/TransactionContext";
//使用TransactionProvider包装我们的应用程序(使得我们的整个应用程序都能够访问我们传递给它的数据)

ReactDOM.createRoot(document.getElementById("root")).render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
);
