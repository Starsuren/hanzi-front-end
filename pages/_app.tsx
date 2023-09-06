import "../styles/globals.scss";
import { Layout } from "../components/Layout";
import withApollo from "../utility/withApollo";
import AuthProvider from "../utility/AuthProvider";
const MyApp = ({ Component, pageProps }: any) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default withApollo({ ssr: false })(MyApp);
