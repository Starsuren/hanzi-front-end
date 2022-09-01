export const updateObject = (oldObject:any, updatedProperties:any) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value:string, rules:any ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.matches) {
        const PASS_PATTERN = /^(?=.*[0-9])(?=.*[- +?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- +?!@#$%^&*\/\\]+$/;
        isValid = PASS_PATTERN.test( value ) && isValid
    }

    if ( rules.isEmail ) {
        const EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = EMAIL_PATTERN.test( value ) && isValid
    }

    return isValid;
}
