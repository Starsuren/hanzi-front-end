import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import withApollo from '../utility/withApollo';
import Spinner from '../components/spinner/Spinner';
import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const variants = {
hidden:{},
visible:{}



}





const Home =  () =>  {
  
  useEffect(() => {
    const debounce = setTimeout(() => {
    
  }, 2000);
     
    return () => {
      clearTimeout()
    }
  }, [])

  const [state,setState] = useState(false);

  const inputHandler = () => {


  }
 
  return (

    <div className={styles.container}>
      <Head>
        <title>Hanzi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>
       <AnimatePresence>{!state && <motion.div exit= {{opacity:0,y:-400, transition:{velocity:60,type:'tween'}}}initial="hidden" animate="visible" className={styles.intro}>
          <h1>Hanzi: A comprehensive Chinese dictionary</h1>
        </motion.div>}
        </AnimatePresence> 
      <div className={styles.search}>
       <input className={styles.search__input} onFocus={()=>setState(true)} type="search" id="search" name="search"/>
       <label className={styles.search__label} htmlFor="search">Search</label>
      </div>
      </main>
    </div>
  )
}

  export default withApollo({ ssr: true })(Home);



