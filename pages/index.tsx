import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import withApollo from '../utility/withApollo';
import {use} from '../generated/graphql';
import Spinner from '../components/spinner/Spinner';
import {useEffect} from 'react';

const Home =  () =>  {
  
  useEffect(() => {
    const debounce = setTimeout(() => {
    
  }, 2000);
     
    return () => {
      clearTimeout()
    }
  }, [])

  const inputHandler = () => {


  }
 
  return (

    <div className={styles.container}>
      <Head>
        <title>Hanzi</title>
 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
     <h1>Hanzi: A comprehensive Chinese dictionary</h1>
       <label htmlFor="search"> Search </label>
       <input onChange={()=>'ji'} type="search" id="search" name="search" placeholder="Search Characters"/>
      </main>
    </div>
  )
}

  export default withApollo({ ssr: true })(Home);



