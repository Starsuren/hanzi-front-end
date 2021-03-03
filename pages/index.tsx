import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import withApollo from '../utility/withApollo';
import {useLoginMutation} from '../generated/graphql';
 

const Home =  () =>  {
  
  //const [lol,{data}] = useLoginMutation({variables:{ logInputs:{username:'flsddo',password:'hellosadadmama'}}});
  
  //if("username" in data?.login!) data?.login.
 
  return (

    <div className={styles.container}>
      <Head>
        <title>Hanzi</title>
 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
     <h1>Hanzi: A comprehensive Chinese dictionary</h1>
     <p></p>
       <label htmlFor="search"> Search </label>
       <input onChange={()=>'ji'} type="search" id="search" name="search" placeholder="Enter a word to begin search"/>
      </main>
    </div>
  )
}

  export default withApollo({ ssr: true })(Home);



