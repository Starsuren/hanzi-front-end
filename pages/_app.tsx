import '../styles/globals.scss'
import {Layout} from '../components/Layout'
import withApollo from '../utility/withApollo';
import {lazy} from 'react';
 

function MyApp({ Component, pageProps }:any) {
  return (
    <Layout>
    <Component {...pageProps} />
    </Layout>
  )
}

export default withApollo({ ssr: false })(MyApp);
