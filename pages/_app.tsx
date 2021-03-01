import Head from 'next/head';

import 'styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,700" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"
          integrity="sha384-i1LQnF23gykqWXg6jxC2ZbCbUMxyw5gLZY6UiUS98LYV5unm8GWmfkIS6jqJfb4E"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
        <title>Calvin Hu</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
