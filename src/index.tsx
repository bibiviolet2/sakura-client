import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "reflect-metadata";
import { RootStoreContext, default as rootStore } from "@viewmodels/RootStore";
import { ApolloProvider } from "@apollo/client";
import client from "@lib/apollo-client"; // Import Apollo Client
import "@styles/global.scss"; // Globální styly

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RootStoreContext.Provider value={rootStore}>
        <App />
      </RootStoreContext.Provider>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
