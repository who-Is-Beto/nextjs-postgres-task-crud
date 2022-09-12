import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
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
