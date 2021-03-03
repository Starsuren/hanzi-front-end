import {useState} from 'react';
import Input from '../components/input/Inputs';
import {RegisterForm} from '../utility/formConfig';
import {checkValidity, updateObject} from '../utility/validation';
import {ChangeEvent} from 'react';
import Button from '../components/Button/Button';
import withApollo from '../utility/withApollo';

const Register = () => {

const [registerForm,setRegisterForm] = useState(RegisterForm);

const [formIsValid, setFormIsValid] = useState(false);

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
      <Button clicked = {()=>{}}btnType="Success" disabled={!formIsValid}>Submit</Button>
     
    </form>
  );

  return (
    <div>
      <h1>Enter your user details</h1>
      {form}
    </div>
  );

  }

  export default withApollo({ ssr: true })(Register);