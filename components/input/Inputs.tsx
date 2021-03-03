import {} from '../../utility/validation';
import {ChangeEvent} from 'react';
import classes from './inputs.module.scss'

interface Input { 
    id:string
    elementType:string
    elementConfig:{ type:string, placeholder:string}
    value:string
    invalid:boolean
    shouldValidate:{required?:boolean,minLength?:number,maxLength?:number, isEmail?:boolean} 
    touched:boolean
    changed:(event:ChangeEvent<HTMLInputElement>)=>void}


const input:React.FC<Input> = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.id}</label>
            {inputElement}
        </div>
    );

};

export default input;



