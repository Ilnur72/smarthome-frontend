import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./store/store";
import { ToastContainer } from "react-toastify";

//Style
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { loadState } from "./Utils/storage";
const token = loadState("token");
// axios.defaults.baseURL = "http://localhost:8070";
axios.defaults.baseURL = "https://smart-home-production.up.railway.app"
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      <ToastContainer />
    </Provider>
  </QueryClientProvider>
);
