import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import withApollo from '../utility/withApollo';
import Spinner from '../components/spinner/Spinner';
import {useEffect, useState, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import { valueFromAST } from 'graphql';
import {useFindCharQuery} from '../generated/graphql';


const variants = {
visible:{ display:'block',y:0, borderRadius:10, opacity:1, transition:{duration:0.3,delay:0.5, type:'tween'}},
hidden:{display:'none',y:500,border:'2px solid #8b9fc4',opacity:0}
}


const Home =  () =>  {

  const {data,loading} = useFindCharQuery({variables:{char:['z'],options:{characters:true,sentences:true,words:true}}})
  const inputRef = useRef<HTMLInputElement|null>(null);
  const [state,setState] = useState<string|null>(null);
  useEffect(() => {
    if (state) {
     setTimeout(()=>inputRef.current!.focus(),1000) ;
    }
  }, [state])

 const dataResults = data && data!.findChar.map((v)=><div className={`${styles[`main__box__results__item--${v.__typename}`]} ${styles.main__box__results__item}`}>{[v.char_detail.character,v.char_detail.meaning,v.char_detail.pinyin]}</div>)



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
      <AnimatePresence >
        {state===null &&  
      <motion.div exit={{opacity:0,width:0,height:0,transition:{velocity:20, duration:0.4,delay:0.3,type:'tween'}}} className={styles.main__box}>
      <motion.div exit={{opacity:0,transition:{ velocity:50, type:'tween'}}} className={styles.main__intro}>
          <h1>Hanzi: A comprehensive Chinese dictionary</h1>
        </motion.div>
      <motion.div  exit={{opacity:0,transition:{duration:0.2,type:'tween'}}} className={styles.search}>
      <input placeholder =" " className={styles.search__input} onKeyPress={(e)=>{if(e.key==='Enter')setState(e.currentTarget.value)}} type="search" id="search" name="search"/>
      <label className={styles.search__label} htmlFor="search">Search</label>
      </motion.div> 
</motion.div>

}
</AnimatePresence>
{typeof state === 'string' &&
      <motion.div  className={[styles.main__box,styles['main__box--open']].join(' ')} variants={variants} initial='hidden' animate='visible'>
      <motion.div initial="" animate="" className={styles['search--box-open']}>
      <input placeholder =" " value={state} className={[styles.search__input,styles.search__input__open].join(' ')} onChange={(e)=>setState(e.currentTarget.value)} type="search" id="search" name="search" ref={inputRef} autoFocus  />
      <label className={styles['search__label--box-open']}  htmlFor="search">Search</label>
      </motion.div> 
      <div className={styles.main__box__results}> 
      {dataResults ? dataResults : (<div><h1>No results were found</h1><p>Try a different term or remove filters</p></div>)}
      </div>
      </motion.div>
}
  </main>
  </div>
  )
}

  export default withApollo({ ssr: true })(Home);

