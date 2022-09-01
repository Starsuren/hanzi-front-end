import { PropsWithChildren } from "react";
import styles from './Tooltip.module.scss';

export const Tooltip:React.FC<PropsWithChildren<{}>> = ({children})=> {

return <div className={styles.tooltip}><div className={styles.tooltip__main}><ul>{children}</ul></div></div>
}