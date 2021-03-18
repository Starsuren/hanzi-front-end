import Link from 'next/link';
import { useApolloClient } from '@apollo/client';
import Modal from '../UI/Modal';
import { useRouter } from "next/router";
import { LoggedQuery, useLoggedQuery , useLogoutMutation} from "../../generated/graphql";
import ActiveLink from './ActiveLink';
import classes from './Navbar.module.scss';
import {motion,AnimatePresence,useCycle } from 'framer-motion';
import {useState} from 'react';

const containerVariants = {
    hidden:{
    scale:0,
    opacity:0
    },
    visible:{
    scale:1,
    opacity:1,
    transition:{type:'spring', stiffness:90, delay:0.2}
    },
    openVisible:{
    scale:1,
    opacity:1,
    transition:{type:'spring', stiffness:90, delay:0.2}
        }

} 

const middleLineVariants = {
    hover:{width:'30px'},
    openHover:{width:0},
    openHidden:{ },
    openVisible:{width:0,transition:{type:'spring',velocity:120,stiffness:140}}

} 

const topLineVariants = {
    hover:{width:"30px"},
    visible:{translateY:-10},
    openHover:{width:['30px','30.5px'], transition:{ease:'easeInOut',stiffness:30,type:'spring',repeat:Infinity,}},
    openHidden:{rotate:0},
    openVisible:{rotate:45 }

} 

const bottomLineVariants = {
    hover:{width:'30px'},
    visible:{translateY:10},
    openHover:{width:['30px','30.5px'], transition:{ease:'easeInOut',stiffness:30,type:'spring',repeat:Infinity}},
    openHidden:{width:'30px',rotate:0 },
    openVisible:{width:'30px',rotate:-45}
} 


const listVariant = {
    visible:{x:0
    },
    visibleTwo:{background:'blue'},
    hidden:{x:400}
    }

const BurgerMenu:React.FC<{open:boolean,clicked:()=>void}> = ({open, clicked}) => (
<motion.div onClick={clicked} variants={containerVariants} whileHover={open? 'openHover':'hover'} initial={open? 'openHidden' : 'hidden'} animate={open?'openVisible':'visible'}
className={classes.nav__menu__burger}> 
<motion.div variants= {middleLineVariants} className={classes.nav__menu__burger__line}></motion.div>
<motion.div variants= {topLineVariants}    className={classes.nav__menu__burger__line2}></motion.div>
<motion.div variants= {bottomLineVariants} className={classes.nav__menu__burger__line3}></motion.div>
</motion.div>
)

const MainLinks:React.FC<{open:boolean, data:LoggedQuery|undefined}> = ({open, data})=>{ 

    let loggedUser = null;
    if(data?.isLogged !== undefined){
    loggedUser = data.isLogged?.username;
    }



 const aniLink = (
        <motion.ul exit={{x:400}} initial='hidden'variants={listVariant} animate='visible'>
        <li> 
        <ActiveLink href="/" activeClassName={classes.active}><a>Home</a></ActiveLink>
        </li> 
        {loggedUser ? <li>   
        <ActiveLink href="/user/" activeClassName={classes.active}><a>{loggedUser}</a></ActiveLink>
        </li>:
        <><li>   
        <ActiveLink href="/login" activeClassName={classes.active}><a>Login</a></ActiveLink>
        </li>
        <li>
        <ActiveLink href="/register" activeClassName={classes.active}><a>Register</a></ActiveLink>
        </li></> }
        </motion.ul>);
        
     const link = (<ul>
        <li> 
        <ActiveLink href="/" activeClassName={classes.active}><a>Home</a></ActiveLink>
        </li> 
        {loggedUser ? <li>   
        <ActiveLink href="/user/" activeClassName={classes.active}><a>{loggedUser}</a></ActiveLink>
        </li>:
        <><li>   
        <ActiveLink href="/login" activeClassName={classes.active}><a>Login</a></ActiveLink>
        </li>
        <li>
        <ActiveLink href="/register" activeClassName={classes.active}><a>Register</a></ActiveLink>
        </li></>}
        </ul>);
 
 return <AnimatePresence>{open? aniLink:link}</AnimatePresence>;
}

export const Navbar:React.VFC = () => {
    const [cycle,runCycle] = useCycle('visible','visibleTwo')
    const [isOpen, setIsOpen] = useState(false);
    const [logout, { loading: logoutLoading }] = useLogoutMutation();
    const { data, loading } = useLoggedQuery();
    const router = useRouter()
    const apolloClient = useApolloClient();
    const logoutHandler = async () => {
        await logout();
        await apolloClient.clearStore();
        router.replace('/')
    } 

    const nav = ( <nav className={classes.nav}>
    <div className={classes.nav__menu}>
     <MainLinks open={isOpen} data={data} />
     <BurgerMenu open={isOpen} clicked={()=>{
     setIsOpen(!isOpen);}} />
     <div className={classes.nav__modal}></div>
     <Modal showModal={isOpen} setModal={()=>setIsOpen(!isOpen)} />
     </div>
     </nav>)
    
  return nav;
}
