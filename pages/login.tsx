import {useState} from 'react';
import Input from '../components/input/Inputs';
import {LoginForm} from '../utility/formConfig';
import {checkValidity, updateObject} from '../utility/validation';
import {ChangeEvent } from 'react';
import Button from '../components/button/Button';
import withApollo from '../utility/withApollo';
import { useRouter } from "next/router";
import {LoggedDocument, LoggedQuery, useLoginMutation} from '../generated/graphql';
import styles from '../styles/login.module.scss';

const Login = () => {
    const router = useRouter();
    const [loginForm,setLoginForm] = useState(LoginForm);
    const [formIsValid, setFormIsValid] = useState(false);
    const [login] = useLoginMutation();
    const [message,setMessage] = useState({message:''});

    const submitHandler = async ()=> {  
        const response = await login({
            variables:{logInputs:{username:loginForm.Name.value, password:loginForm.Password.value}} ,
            update: (cache, {data}) => {
                if('username' in data!.login){

              cache.writeQuery<LoggedQuery>({
                query:LoggedDocument,
                data: {
                  __typename: "Query",
                  isLogged: data?.login
                },
              });
            }
        }
    }, 
    );

    if (typeof router.query.next === "string") {
        router.push(router.query.next);
    }
    if('username' in response.data!.login){
        router.push("/");
    }

    if('message' in response.data!.login)
    {
    setMessage(response.data!.login)
    }
    }


    const inputChangedHandler = (event:ChangeEvent<HTMLInputElement>, inputIdentifier:string) => {
        const updatedFormElement = updateObject(loginForm[inputIdentifier], {
          value: event.target.value,
          valid: checkValidity(
            event.target.value,
            loginForm[inputIdentifier].validation
          ),
          touched: true
        });
        const updatedRegisterForm = updateObject(loginForm, {
          [inputIdentifier]: updatedFormElement
        });
    
        let formIsValid = true;
        for (let inputIdentifier in updatedRegisterForm) {
          formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
        }
        setLoginForm(updatedRegisterForm);
        setFormIsValid(formIsValid);
      };
    
      const formElementsArray = [];
      for (let key in loginForm) {
        formElementsArray.push({
          id: key,
          config: loginForm[key]
        });
      }
    
      let form = (
        <form className={styles.main__form} >
           <h1>Welcome back!</h1>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              id={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event:ChangeEvent<HTMLInputElement>)=>inputChangedHandler(event,formElement.id)}
            />
          ))}
          <Button clicked = {submitHandler}  btnType="Success" disabled={!formIsValid}>Login</Button>
        </form>
      );
    
      return (
        <div className={styles.main}>
        { message.message ? message.message : false
          }
          {form}
        </div>
      );
    
      }
    
      export default withApollo({ ssr: true })(Login);