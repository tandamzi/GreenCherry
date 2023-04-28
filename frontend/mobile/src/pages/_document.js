import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="theme-color" content="#84A59D" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <body>
          <div className=' max-h-max max-w-sm mx-auto border-neutral-900 border-solid border-opacity-95'>
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
