import {} from '../../utility/validation';
import {ChangeEvent, useState, useRef,LegacyRef, RefObject, MouseEvent, Children} from 'react';
import styles from './inputs.module.scss'

interface Input { 
    id:string
    elementType:string
    elementConfig:{ type:string, placeholder:string}
    value:string
    invalid:boolean
    shouldValidate:{required?:boolean,minLength?:number,maxLength?:number, isEmail?:boolean} 
    touched:boolean
    changed:(event:ChangeEvent<HTMLInputElement>)=>void
}

const input:React.FC<Input> = ( props ) => {
    let inputElement = null;
    const inputClasses = [styles.input];
    const inputElementClasses = [styles.input__element];
    const buttonClasses = [styles['input__togglebtn--showpass']];
    const inputRef = useRef<LegacyRef<HTMLInputElement>>() as RefObject<HTMLInputElement>;
    const inputDiv = useRef<HTMLDivElement>(null);
    const [passwordShown, setPasswordShown] = useState(false);
    

    const inputFocusHandler = (e:MouseEvent<HTMLDivElement, globalThis.MouseEvent>)=>{  
        if (e.nativeEvent.offsetX  > 220 && e.nativeEvent.offsetX  < 258 && e.nativeEvent.offsetY < 66 && e.nativeEvent.offsetY > 28  ) {
         inputRef.current!.focus(); 
        }
    }

      
    if (props.invalid && props.shouldValidate && props.touched) {
        inputElementClasses.push(styles.input__invalid);
    }



    
    
    if(  props.elementType === 'password'){
         passwordShown ? buttonClasses.push(styles['input__togglebtn--showpass-show']):buttonClasses.push(styles['input__togglebtn--showpass-hidden']);   
    }

    switch ( props.elementType ) {

        case('username'):
        if(props.value.length < 14) inputClasses.push(styles.input__username); 
            inputElement = 
                <div ref={inputDiv}
                onClick={inputFocusHandler} className={inputClasses.join(' ')}>
                <label className={styles.label}>{props.id}</label>
                <input ref={inputRef} 
                 maxLength={20}
                 minLength={3}
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
                </div>;
                break;
            case ('password'):
                let config = passwordShown ? {...props.elementConfig, type:'text'} : props.elementConfig;
                inputElement =  <div ref={inputDiv} 
                className={inputClasses.join(' ')}>
                <label className={styles.label}>{props.id}</label>
                <input ref={inputRef}
                className={inputElementClasses.join(' ')}
                maxLength={18}
                minLength={8}
                {...config}
                value={props.value}
                onChange={props.changed} />
               <button type={'button'} className={buttonClasses.join(' ')} onClick={()=>{setPasswordShown(!passwordShown),inputRef.current!.focus()}} /> 
                </div>;
           break;
           case('email'):
           if(props.value.length < 14) inputClasses.push(styles.input__email); 
           inputElement = 
               <div ref={inputDiv}
               onClick={inputFocusHandler} className={inputClasses.join(' ')}>
               <label className={styles.label}>{props.id}</label>
               <input ref={inputRef} 
               className={inputElementClasses.join(' ')}
               maxLength={40}
               {...props.elementConfig}
               value={props.value}
               onChange={props.changed} />
               </div>;
               break;


        
        default:
            inputElement = 
                <div ref={inputDiv}
                onClick={inputFocusHandler} className={inputClasses.join(' ')}>
                <label className={styles.label}>{props.id}</label>
                <input ref={inputRef} 
                className={inputElementClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
                </div>;
                break;

            }

    return inputElement;

};

export default input;



