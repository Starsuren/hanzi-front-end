import React,{EventHandler} from 'react';

import classes from './Button.module.scss';

const Button:React.FC<{disabled:boolean,btnType:string,clicked:any}> = (props) => (
    <button type="button"
        disabled={props.disabled}
        className={[classes.Button, classes[`Button--${props.btnType}`]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;