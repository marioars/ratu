import "normalize.css/normalize.css";
import "../styles/globals.css";
import "../styles/slick.css";
import "../styles/slick-theme.css";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
