import React,{EventHandler, PropsWithChildren} from 'react';
import { motion} from 'framer-motion';
import classes from './Button.module.scss';

const DEFAULT_PROPS = {disabled:false,btnType:'success',clicked:()=>{}}
const Button:React.FC<PropsWithChildren & {disabled?:boolean,btnType?:string,clicked?:()=>void}> = (props = DEFAULT_PROPS) => {
    if(props.btnType ==='loading') {
return <motion.button
transition={{
    duration: 3,
    ease: "easeInOut",
    times: [0,0.3,0.9,0.9,,0.3,1],
    repeat: Infinity,
    repeatDelay: 0.5
  }} 
animate={{rotate:[0,0,360,360,0,0],width:['230px','40px','40px','40px','40px','230px'], borderRadius:['4px','4px','50px','50px','4px','4px']}}
type="button"
disabled={props.disabled}
className={[classes.Button, classes[`Button--${props.btnType}`]].join(' ')}
>{props.children}</motion.button>
}
    
  return <button type="button"
        disabled={props.disabled}
        className={[classes.Button, classes[`Button--${props.btnType}`]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
};

export default Button;