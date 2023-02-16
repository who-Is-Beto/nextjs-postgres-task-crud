import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Navbar />
          <div className="pageContainer">
            <Component {...pageProps} />
            <div id="toast"></div>
            <div id="modal"></div>
          </div>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
