import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../src/components/Navbar";
import LoggedInProvider from "../src/components/context/LoggedInContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoggedInProvider>
        <Navbar />
        <Component {...pageProps} />
      </LoggedInProvider>
    </>
  );
}

export default MyApp;
