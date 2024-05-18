import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import splash from "../components/shared/splash";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style>{splash}</style>
        </Head>

        <body>
          <div id={"globalLoader"}>
            <div className="containera">
              <div className="item item-1"></div>
              <div className="item item-2"></div>
              <div className="item item-3"></div>
              <div className="item item-4"></div>
            </div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
