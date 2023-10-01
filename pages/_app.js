import "../styles/globals.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
      setLiffObject(liff);
    } catch (error) {
      console.error("liff init error", error.message);
      setLiffError(error.toString());
    }
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
