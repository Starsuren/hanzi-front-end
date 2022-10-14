import {} from "../../utility/validation";
import { RegisterMutation } from "../../generated/graphql";
import {
  ChangeEvent,
  useState,
  useRef,
  LegacyRef,
  RefObject,
  MouseEvent,
  ReactElement,
} from "react";
import styles from "./inputs.module.scss";
import { Tooltip } from "../UI/Tooltip";
interface Input {
  id: string;
  elementType: string;
  elementConfig: { type: string; placeholder: string };
  value: string;
  invalid: boolean;
  shouldValidate: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    isEmail?: boolean;
  };
  touched: boolean;
  changed: (event: ChangeEvent<HTMLInputElement>) => void;
  validateMsg: RegisterMutation | undefined | null;
  clientValidate: boolean;
}

const input: React.FC<Input> = (props) => {
  let inputElement = null;
  const inputClasses = [styles.input];
  const inputElementClasses = [styles.input__element];
  const buttonClasses = [styles["input__togglebtn--showpass"]];
  const inputRef = useRef<
    LegacyRef<HTMLInputElement>
  >() as RefObject<HTMLInputElement>;
  const inputDiv = useRef<HTMLDivElement>(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [showValidation, setValidation] = useState("");
  const [showEmailValidation, setEmailValidation] = useState(false);
  let UsernameTooltip: ReactElement | null = null,
    PasswordTooltip: ReactElement | null = null,
    EmailTooltip: ReactElement | null = null;

  props.validateMsg !== undefined &&
    "responses" in props.validateMsg?.register! &&
    props.validateMsg?.register.responses.map((e) => {
      e.property === "username" &&
        e.constraints.__typename === "UserConstraint" &&
        (UsernameTooltip = (
          <Tooltip type="error">
            {e.constraints.isNotEmpty && <li>{e.constraints.isNotEmpty}</li>}
            {e.constraints.maxLength && <li>{e.constraints.maxLength}</li>}
          </Tooltip>
        ));

      e.property === "password" &&
        e.constraints.__typename === "PasswordConstraint" &&
        (PasswordTooltip = (
          <Tooltip type="error">
            {e.constraints.isNotEmpty && <li>{e.constraints.isNotEmpty}</li>}{" "}
            {e.constraints.isLength && <li>{e.constraints.isLength}</li>}
            {e.constraints.matches && <li>{e.constraints.matches}</li>}
          </Tooltip>
        ));

      e.property === "email" &&
        e.constraints.__typename === "EmailConstraint" &&
        (EmailTooltip = (
          <Tooltip type="error">
            <li>{e.constraints.isNotEmpty}</li>
            <li>{e.constraints.isEmail}</li>
          </Tooltip>
        ));
    });

  const inputFocusHandler = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    if (
      e.nativeEvent.offsetX > 220 &&
      e.nativeEvent.offsetX < 258 &&
      e.nativeEvent.offsetY < 66 &&
      e.nativeEvent.offsetY > 28
    ) {
      inputRef.current!.focus();
    }
  };

  if (props.invalid && props.shouldValidate && props.touched) {
    inputElementClasses.push(styles.input__invalid);
  }

  if (props.elementType === "password") {
    passwordShown
      ? buttonClasses.push(styles["input__togglebtn--showpass-show"])
      : buttonClasses.push(styles["input__togglebtn--showpass-hidden"]);
  }

  switch (props.elementType) {
    case "username":
      if (props.value.length < 14) inputClasses.push(styles.input__username);
      inputElement = (
        <div
          ref={inputDiv}
          onClick={inputFocusHandler}
          className={inputClasses.join(" ")}
          onMouseDown={(e) => e.preventDefault()}
        >
          <label className={styles.label}>{props.id}</label>
          <input
            ref={inputRef}
            onFocus={() => setValidation("username")}
            onBlur={() => setValidation("")}
            maxLength={20}
            className={inputElementClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {UsernameTooltip ||
          (props.clientValidate &&
            showValidation === "username" &&
            props.invalid) ? (
            <Tooltip type="validation">
              <li>
                Username field is required and must not be more than 20
                characters
              </li>
            </Tooltip>
          ) : null}
        </div>
      );
      break;
    case "password":
      let config = passwordShown
        ? { ...props.elementConfig, type: "text" }
        : props.elementConfig;
      const UPPER_LOWER_REGEX =
        /(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- +?!@#$%^&*\/\\]+$/;
      const NUMBER_REGEX = /^(?=.*[0-9])[a-zA-Z0-9- +?!@#$%^&*\/\\]+$/;
      const SPECIAL_CHAR_REGEX =
        /^(?=.*[- +?!@#$%^&*\/\\])[a-zA-Z0-9- +?!@#$%^&*\/\\]+$/;
      const LENGTH_REGEX = /^[a-zA-Z0-9- +?!@#$%^&*\/\\]{8,18}$/;
      const VALID_COLOR = { color: "rgb(59, 131, 131)" };
      const INVALID_COLOR = { color: "rgb(233, 101, 101)" };
      const upperLowerColor = UPPER_LOWER_REGEX.test(props.value)
        ? VALID_COLOR
        : INVALID_COLOR;
      const numberColor = NUMBER_REGEX.test(props.value)
        ? VALID_COLOR
        : INVALID_COLOR;
      const specialCharColor = SPECIAL_CHAR_REGEX.test(props.value)
        ? VALID_COLOR
        : INVALID_COLOR;
      const lengthColor = LENGTH_REGEX.test(props.value)
        ? VALID_COLOR
        : INVALID_COLOR;

      inputElement = (
        <div ref={inputDiv} className={inputClasses.join(" ")}>
          <label className={styles.label}>{props.id}</label>
          <input
            ref={inputRef}
            onFocus={() => setValidation("password")}
            onBlur={() => setValidation("")}
            maxLength={18}
            minLength={8}
            className={inputElementClasses.join(" ")}
            {...config}
            value={props.value}
            onChange={props.changed}
          />
          <button
            type={"button"}
            className={buttonClasses.join(" ")}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setPasswordShown(!passwordShown), inputRef.current!.focus();
            }}
          />
          {PasswordTooltip ||
          (props.clientValidate &&
            showValidation === "password" &&
            props.invalid) ? (
            <Tooltip type="validation">
              <li style={lengthColor}>Must be between 8-18 Characters</li>
              <li style={upperLowerColor}>
                Must contain at least one upper and lower character
              </li>
              <li style={numberColor}>Must contain a number between 0-9</li>
              <li style={specialCharColor}>
                Must contain at least one special character
              </li>
            </Tooltip>
          ) : null}
        </div>
      );
      break;
    case "email":
      if (props.value.length < 14) inputClasses.push(styles.input__email);
      inputElement = (
        <div
          ref={inputDiv}
          onClick={inputFocusHandler}
          className={inputClasses.join(" ")}
          onMouseDown={(e) => e.preventDefault()}
        >
          <label className={styles.label}>{props.id}</label>
          <input
            ref={inputRef}
            onBlur={() => {
              setEmailValidation(true);
            }}
            className={inputElementClasses.join(" ")}
            maxLength={40}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
          {EmailTooltip || (showEmailValidation && props.invalid) ? (
            <Tooltip type="validation">
              <li>Must be a valid email</li>
            </Tooltip>
          ) : null}
        </div>
      );
      break;
    default:
      inputElement = (
        <div
          ref={inputDiv}
          onClick={inputFocusHandler}
          className={inputClasses.join(" ")}
        >
          <label className={styles.label}>{props.id}</label>
          <input
            ref={inputRef}
            className={inputElementClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
  }

  return inputElement;
};

export default input;
