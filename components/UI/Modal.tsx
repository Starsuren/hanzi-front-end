import {useEffect,useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import classes from './Modal.module.scss';
import {createPortal} from 'react-dom';

 
const variants = {
hidden:{opacity:0},
visible:{opacity:1}

}

const Modal:React.FC<{showModal:boolean,setModal:any}> = ({showModal,setModal}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
  setMounted(true);
  }, [showModal])

 return mounted ? createPortal(<AnimatePresence> {showModal ? <motion.div onClick={setModal} exit={{opacity:0}}variants={variants} animate="visible" initial="hidden" className={classes.modal}></motion.div>:null} </AnimatePresence>,document.getElementById('portal')!):null; 
  }

export default Modal;
