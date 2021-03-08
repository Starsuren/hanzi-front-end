import {useState} from 'react';
import Input from '../components/input/Inputs';
import {RegisterForm} from '../utility/formConfig';
import {checkValidity, updateObject} from '../utility/validation';
import {ChangeEvent} from 'react';
import Button from '../components/button/Button';
import withApollo from '../utility/withApollo';
import { useRouter } from 'next/router';
import { useRegisterMutation,LoggedDocument,LoggedQuery } from "../generated/graphql";

const Register = () => {
const [register] = useRegisterMutation();
const [registerForm,setRegisterForm] = useState(RegisterForm);
const [formIsValid, setFormIsValid] = useState(false);
const [message,setMessage] = useState({message:''});

const router = useRouter();
const submitHandler = async () => { 
    const response = await register({
        variables:{regInputs:{username:registerForm.name.value, password:registerForm.password.value, email:registerForm.email.value}} ,
        update: (cache, { data }) => {
            if('username' in data!.register){

          cache.writeQuery<LoggedQuery>({
            query:LoggedDocument,
            data: {
              __typename: "Query",
              isLogged: data?.register,
            },
          });
        }
    }
}, 
);

if('username' in response.data!.register){
    router.push("/");
}

if('message' in response.data!.register)
{
setMessage(response.data!.register)
}

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

  let form = (
    <form >
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
      <Button clicked = {submitHandler} btnType="Success" disabled={!formIsValid}>Submit</Button>
     
    </form>
  );

  return (
    <div>
      <h1>Enter your user details</h1>
      { message.message ? message.message : false}
      {form}
    </div>
  );

  }

  export default withApollo({ ssr: true })(Register);