import {useState} from 'react';
import Input from '../components/input/Inputs';
import {RegisterForm} from '../utility/formConfig';
import {checkValidity, updateObject} from '../utility/validation';
import {ChangeEvent} from 'react';
import Button from '../components/button/Button';
import withApollo from '../utility/withApollo';
import { useRouter } from 'next/router';
import { RegisterMutation, useRegisterMutation,LoggedDocument,LoggedQuery} from "../generated/graphql";
import styles from './../styles/sign-up.module.scss';
import {useIsAuth} from '../utility/useIsAuth';
import Spinner from '../components/spinner/Spinner';
import {motion, AnimatePresence} from 'framer-motion';

const Register = () => {
const [register] = useRegisterMutation();
const [registerForm,setRegisterForm] = useState(RegisterForm);
const [formIsValid, setFormIsValid] = useState(false);
const [message,setMessage] = useState<RegisterMutation>({register:{message:''}});
const router = useRouter();
const [showComponents,setShowComponents] = useState(false);
const [showLoading, setShowLoading] = useState(false);
useIsAuth(setShowComponents);

const errorMsg = 'message' in message!.register && message!.register.message;

const Error = (<div className={styles.main__container}>
  <AnimatePresence>{errorMsg ?
    <motion.div key="error" exit={{opacity:0,x:20}} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}  transition={{type:'spring',duration:1,stiffness:30}} 
    className={styles.main__error}>{errorMsg}</motion.div> : null}</AnimatePresence></div>)

const submitHandler = async () => { 
    const response = await register({
        variables:{regInputs:{username:registerForm.username.value, password:registerForm.password.value, email:registerForm.email.value}} ,
        update: (cache, { data }) => {
            if('username' in data!.register){

          cache.writeQuery<LoggedQuery>({
            query:LoggedDocument,
            data: {
              __typename: "Query",
              isLogged: data?.register
            },
          });
        }
    }
}, 
);

setMessage({register:{message:''}});
setShowLoading(true);
setTimeout(() => {
if('username' in response.data!.register){router.push("/")}

else if('message' in response.data!.register) {
  setMessage({...response.data!});
  setShowLoading(false);
}
}, 3000);
}

const inputChangedHandler = (event:ChangeEvent<HTMLInputElement>, inputIdentifier:string) => {
    const updatedFormElement = updateObject(registerForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        registerForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedRegisterForm = updateObject(registerForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedRegisterForm) {
      formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
    }
    setRegisterForm(updatedRegisterForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in registerForm) {
    formElementsArray.push({
      id: key,
      config: registerForm[key]
    });
  }

  let Form = (
    <form className={styles.main__form} >
       <h1>Sign-up</h1>
       <p>Create a new account</p>
      {formElementsArray.map(formElement => {
        return(<Input
          key={formElement.id}
          id={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event:ChangeEvent<HTMLInputElement>)=>inputChangedHandler(event,formElement.id)}
          validateMsg={message}
          clientValidate={true}
        />)
})}
      
      {showLoading ? <Button btnType='loading' />  : <Button clicked = {submitHandler}  btnType="Success" disabled={!formIsValid}>Login</Button>}
    </form>
  );

  return ( 
    <div className={styles.main}>
  {showComponents ?  
    <>{Error} 
      {Form}
    </> : <Spinner/>}
    </div>
  );

  }

  export default withApollo({ ssr: false })(Register);