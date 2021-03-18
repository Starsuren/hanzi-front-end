import React from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import classes from './Modal.module.scss';

 
const variants = {
hidden:{opacity:0},
visible:{opacity:1}

}

const Modal:React.FC<{showModal:boolean,setModal:any}> = ({showModal,setModal}) => {
 return <AnimatePresence> {showModal ? <motion.div onClick={setModal} exit={{opacity:0}}variants={variants} animate="visible" initial="hidden" className={classes.modal}></motion.div>:null} </AnimatePresence>
  }

export default Modal;
