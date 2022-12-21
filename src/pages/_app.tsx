import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Navbar />
        <div className="pageContainer">
          <Component {...pageProps} />
          <div id="toast"></div>
          <div id="modal"></div>
        </div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
