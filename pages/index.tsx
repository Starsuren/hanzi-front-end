import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import withApollo from '../utility/withApollo';
import Spinner from '../components/spinner/Spinner';
import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const variants = {
hidden:{minWidth: '20rem', padding:'0 3rem',border:'1px dashed #999ca1',borderRadius:15,backgroundColor:''},
visible:{border:'2px solid #aeccfc', borderRadius:10, backgroundColor:'',width:'70%',height:'70%', transition:{type:'spring', stiffness:40}}
}

const searchVariant = {


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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Varela&display=swap" rel="stylesheet" /> 
      </Head>


      <main className={styles.main}>
      <motion.div className={styles.main__box} variants={variants} initial="hidden" animate={state && 'visible'}>
       <AnimatePresence >{!state && <motion.div exit={{opacity:0,y:-400, transition:{ velocity:100,type:'tween'}}}initial="hidden" animate="visible" className={styles.main__intro}>
          <h1>Hanzi: A comprehensive Chinese dictionary</h1>
        </motion.div>}
        </AnimatePresence>  
      <div className={styles.search}>
      <input placeholder =" " className={styles.search__input} onChange={()=>setState(true)} type="search" id="search" name="search"/>
       <label className={styles.search__label} htmlFor="search">Search</label>
      </div>
      </motion.div>
      </main>
    </div>
  )
}

  export default withApollo({ ssr: true })(Home);



