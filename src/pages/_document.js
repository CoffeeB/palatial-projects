import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-bs-theme="dark">
      <Head>
        <link rel="icon" type="" href="/logo.png" />

        <link rel="stylesheet" href="/assets/css/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        {/* <link rel="stylesheet" href="/assets/css/bootstrap-btn.min.css" /> */}
        <link
          rel="stylesheet"
          href="/assets/css/boxicons/css/boxicons.min.css"
        />
        <link rel="stylesheet" href="/assets/css/boxicons/css/boxicons.css" />
        <link rel="stylesheet" href="/assets/css/boxicons/css/animations.css" />
        <link rel="stylesheet" href="/assets/css/lib.bundle.css" />
        <link rel="stylesheet" href="/assets/css/theme.bundle.css" />
        <link
          rel="stylesheet"
          href="/assets/css/boxicons/css/transformations.css"
        />
        <script src="/assets/js/theme.min.js" async></script>
        <script src="/assets/js/vendor.bundle.js" async></script>
      </Head>
      <body data-bs-theme="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
