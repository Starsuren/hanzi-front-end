import { useEffect, useState } from "react";
import Input from "../components/input/Inputs";
import { loginForm as initialForm } from "../utility/formConfig";
import { checkValidity, updateObject } from "../utility/validation";
import { ChangeEvent } from "react";
import Button from "../components/button/Button";
import withApollo from "../utility/withApollo";
import { useRouter } from "next/router";
import {
  LoggedDocument,
  LoggedQuery,
  useLoginMutation,
} from "../generated/graphql";
import styles from "../styles/login.module.scss";
import { useIsAuth } from "../utility/useIsAuth";
import Spinner from "../components/spinner/Spinner";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState(initialForm);
  const [formIsValid, setFormIsValid] = useState(false);
  const [login] = useLoginMutation();
  const [message, setMessage] = useState({ message: "" });
  const [showComponents, setShowComponents] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useIsAuth(setShowComponents);
  const Error = (
    <div className={styles.main__container}>
      <AnimatePresence>
        {message.message ? (
          <motion.div
            key="error"
            exit={{ opacity: 0, x: 20 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 1, stiffness: 30 }}
            className={styles.main__error}
          >
            There are no users that matches the details you have entered
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );

  const submitHandler = async () => {
    const response = await login({
      variables: {
        logInputs: {
          username: loginForm.username.value,
          password: loginForm.password.value,
        },
      },
      update: (cache, { data }) => {
        if ("username" in data!.login) {
          cache.writeQuery<any>({
            query: LoggedDocument,
            data: {
              __typename: "Query",
              isLogged: data?.login,
            },
          });
        }
      },
    });
    setMessage({ message: "" });
    setShowLoading(true);
    setTimeout(() => {
      if ("username" in response.data!.login) {
        router.push("/");
      } else if ("message" in response.data!.login) {
        setMessage(response.data!.login);
        setShowLoading(false);
      }
    }, 3000);
  };

  const inputChangedHandler = (
    event: ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    const updatedFormElement = updateObject(loginForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        loginForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedRegisterForm = updateObject(loginForm, {
      [inputIdentifier]: updatedFormElement,
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
      config: loginForm[key],
    });
  }

  let Form = (
    <form className={styles.main__form}>
      <h1>Login</h1>
      <p>Log into your account</p>
      {formElementsArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            id={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event: ChangeEvent<HTMLInputElement>) =>
              inputChangedHandler(event, formElement.id)
            }
            validateMsg={undefined}
            clientValidate={false}
          />
        );
      })}

      {showLoading ? (
        <Button btnType="loading" />
      ) : (
        <Button
          clicked={submitHandler}
          btnType="Success"
          disabled={!formIsValid}
        >
          Login
        </Button>
      )}
    </form>
  );

  return (
    <div className={styles.main}>
      {showComponents ? (
        <>
          {Error}
          {Form}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default withApollo({ ssr: false })(Login);
