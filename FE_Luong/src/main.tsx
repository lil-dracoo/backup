import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
import "antd/dist/reset.css";
import ReactDOM from "react-dom/client";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "nprogress/nprogress.css";
import ProgressBar from "./components/ProgressBar";
import "./styles/nprogress.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ProgressBar />
      <App />
    </AuthProvider>
  </BrowserRouter>
);