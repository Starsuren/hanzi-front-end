import {bottomLineVariants, listVariant, middleLineVariants,topLineVariants,containerVariants} from './navBarBurgerVariant';
import { useApolloClient } from '@apollo/client';
import Modal from '../UI/Modal';
import { useRouter } from "next/router";
import { LoggedQuery, useLoggedQuery , useLogoutMutation} from "../../generated/graphql";
import ActiveLink from './ActiveLink';
import {motion,AnimatePresence,useCycle } from 'framer-motion';
import {useState} from 'react';
import styles from './navbar.module.scss'
import Spinner from '../spinner/Spinner'

const BurgerMenu:React.FC<{showModal:boolean,setModal:()=>void}> = ({showModal, setModal}) => (
<motion.div onClick={setModal} variants={containerVariants} whileHover={showModal? 'openHover':'hover'} initial={showModal? 'openHidden' : 'hidden'} animate={showModal?'openVisible':'visible'}
className={styles.nav__menu__burger}> 
<motion.div variants= {middleLineVariants} className={styles.nav__menu__burger__line}></motion.div>
<motion.div variants= {topLineVariants}    className={styles.nav__menu__burger__line2}></motion.div>
<motion.div variants= {bottomLineVariants} className={styles.nav__menu__burger__line3}></motion.div>
</motion.div>
)

const MainLinks:React.FC<{showModal:boolean,setModal:()=>void, data:{loading:boolean,logged:LoggedQuery|undefined}}> = ({setModal,showModal, data})=>{ 

    let loggedUser = null;
    if(data?.logged?.isLogged !== undefined){
    loggedUser = data.logged.isLogged?.username;
    }
 function closeModal(){
showModal && setModal();
 }

     const BaseLinks =(<>
        <li> 
        <ActiveLink href="/" activeClassName={styles.active}><a onClick={closeModal}>Home</a></ActiveLink>
        </li> 
        {loggedUser ? <li>   
        <ActiveLink href="/user/" activeClassName={styles.active}><a onClick={closeModal}>{loggedUser}</a></ActiveLink>
        </li>:
        <><li>   
        <ActiveLink href="/login" activeClassName={styles.active}><a onClick={closeModal}>Login</a></ActiveLink>
        </li>
        <li>
        <ActiveLink href="/sign-up" activeClassName={styles['active--button']}>{showModal?<a onClick={closeModal}>Sign-up</a>:<button>Sign-up</button>}</ActiveLink>
        </li>
        </>}
        </>)


     const AniLinks = <AnimatePresence>{showModal?<motion.ul key="open" exit={{x:400}} initial='hidden'variants={listVariant} transition={{duration:0.4}} animate='visible'>{BaseLinks}</motion.ul>:
     <motion.ul initial={{opacity:0}} animate={{opacity:1}} key="closed">{BaseLinks}</motion.ul>}</AnimatePresence>;


 return data.loading ? <Spinner/> : AniLinks;
}

export const Navbar:React.FC = () => {
 
    const [isOpen, setIsOpen] = useState(false);
    const [logout, { loading: logoutLoading }] = useLogoutMutation();
    const { data, loading } = useLoggedQuery( {ssr:false});
    const router = useRouter()
    const apolloClient = useApolloClient();
    const logoutHandler = async () => {
        await logout();
        await apolloClient.clearStore();
        router.replace('/')
    } 

    const openHandler = () => setIsOpen(!isOpen);

    const nav = ( <nav className={styles.nav}>
    <div className={styles.nav__menu}>
     <MainLinks showModal={isOpen} setModal ={openHandler} data={{loading,logged:data}} />
     <BurgerMenu showModal={isOpen} setModal={openHandler} />
     <div className={styles.nav__modal}></div>
     <Modal showModal={isOpen} setModal={openHandler} />
     </div>
     </nav>)
    
  return nav;
}
