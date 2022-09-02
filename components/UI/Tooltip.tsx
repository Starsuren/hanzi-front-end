import { PropsWithChildren } from "react";
import styles from './Tooltip.module.scss';
import {motion} from 'framer-motion';

export const Tooltip:React.FC<PropsWithChildren<{type:'error'|'validation'}>> = ({children,type})=> {

if(type === 'error') return <div className={styles.tooltip__error}><div className={styles.tooltip__error__box}><ul>{children}</ul></div></div>
return <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}} className={styles.tooltip__validation}><div className={styles.tooltip__validation__box}><ul>{children}</ul></div></motion.div>
}