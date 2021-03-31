import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import withApollo from '../utility/withApollo';
import Spinner from '../components/spinner/Spinner';
import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

const variants = {
hidden:{ opacity:1, border:'1px dashed #999ca1',borderRadius:15},
visible:{border:'3px solid #8b9fc4', borderRadius:10 , transition:{type:'spring', stiffness:40, delay:5}}
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>


      <main className={styles.main}>
      <motion.div className={state ? [styles.main__box, styles['main__box--open']].join(' '): styles.main__box} variants={variants} initial="hidden" animate={state && 'visible'}>
       <AnimatePresence >{!state && (<><motion.div exit={{opacity:0,y:-400, transition:{velocity:300, type:'tween'}}}initial="hidden" animate="visible" className={styles.main__intro}>
          <h1>Hanzi: A comprehensive Chinese dictionary</h1>
        </motion.div>
         
      <motion.div exit={{opacity:0}} className={state? styles['search--box-open'] : styles.search}>
      <input placeholder =" " className={styles.search__input} onChange={()=>setState(true)} type="search" id="search" name="search"/>
      <label className={state? styles['search__label--box-open'] : styles.search__label} htmlFor="search">Search</label>
      </motion.div></>) }
      </AnimatePresence> 
      {state && 
      <div className={styles.main__box__results}> 
      <motion.div className={`${styles['main__box__results__item--char']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--word']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--sent']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--char']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--word']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--sent']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--char']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--word']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--sent']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--char']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--word']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      <motion.div className={`${styles['main__box__results__item--sent']} ${styles.main__box__results__item}`}>中 meaning:Middle pinyin:Zhong </motion.div>
      </div>
}

      </motion.div>
      </main>
    </div>
  )
}

  export default withApollo({ ssr: true })(Home);



