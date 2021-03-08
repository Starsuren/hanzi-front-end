
export interface LogRegisterType {
[key:string]:{ elementType:string, 
elementConfig:{ type:string, placeholder:string},value:string,validation:{required?:boolean,minLength?:number,maxLength?:number, isEmail?:boolean}, valid:boolean, touched:boolean}
}

export const LoginForm:LogRegisterType = { Name: {
  elementType: 'input',
  elementConfig: {
    type: 'text',
    placeholder: 'Name'
  },
  value: '',
  validation: {
    required: true,
  },
  valid: false,
  touched: false
},  Password: {
  elementType: 'password',
  elementConfig: {
    type: 'text',
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
{ Name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name'
      },
      value: '',
      validation: {
        required: true,
        maxLength:15
      },
      valid: false,
      touched: false
    }, 
    
      Password: {
          elementType: 'password',
          elementConfig: {
            type: 'text',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength:8,
            maxLength:20
          },
          valid: false,
          touched: false
        },
        
          Email: {
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
  




