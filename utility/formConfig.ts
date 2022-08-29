
export interface LogRegisterType {
[key:string]:{ elementType:string, 
elementConfig:{ type:string, placeholder:string},value:string,validation:{required?:boolean,minLength?:number,maxLength?:number, isEmail?:boolean}, valid:boolean, touched:boolean}
}

export const loginForm:LogRegisterType = { username: {
  elementType: 'username',
  elementConfig: {
    type: 'text',
    placeholder: 'Username'
  },
  value: '',
  validation: {
    required: true,
  },
  valid: false,
  touched: false
},  password: {
  elementType: 'password',
  elementConfig: {
    type: 'password',
    placeholder: 'Password'
  },
  value: '',
  validation: {
    required: true,
  },
  valid: false,
  touched: false
},
};

export const RegisterForm:LogRegisterType =
{ username: {
      elementType: 'username',
      elementConfig: {
        type: 'text',
        placeholder: 'Username'
      },
      value: '',
      validation: {
        required: true,
        minLength:3,
        maxLength:20
      },
      valid: false,
      touched: false
    }, 
    
      password: {
          elementType: 'password',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength:8,
            maxLength:18
          },
          valid: false,
          touched: false
        },
        
          email: {
            elementType: 'email',
            elementConfig: {
              type: 'email',
              placeholder: 'E-Mail'
            },
            value: '',
            validation: {
              required: true,
              isEmail: true
            },
            valid: false,
            touched: false
          }
        };
  




