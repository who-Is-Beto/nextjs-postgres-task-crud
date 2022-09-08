import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../store";
import Navbar from "@/components/Navbar";
import "animate.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="layout">
        <Navbar />
        <div className="pageContainer">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
