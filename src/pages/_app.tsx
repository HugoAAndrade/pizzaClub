import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

import { AuthProvider } from "@/contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/faviconPizza.ico" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer theme="dark" autoClose={2500} />
      </AuthProvider>
    </>
  );
}
