import "antd/dist/reset.css";
import "./index.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import BaseContextProvider from "./providers/BaseContextProvider";
import Login from "./pages/Login";
import TwoFactor from "./pages/TwoStepAuth";

export default function App() {
  return (
    <StrictMode>
      <BaseContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/two-factor" element={<TwoFactor />} />
          </Routes>
        </BrowserRouter>
      </BaseContextProvider>
    </StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
