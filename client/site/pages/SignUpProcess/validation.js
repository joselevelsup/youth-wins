import { checkUserEmail } from "../../actions/auth";
import { emailValid } from "../../components/helpers";

const validate = (values) => {
    const errors = {};

    if(!values.firstName){
        errors.firstName = "required";
    }

    if(!values.lastName){
        errors.lastName = "required";
    }

    if(!values.email){
        errors.email = " ";
    }

    if(values.email){
        if(!emailValid(values.email)){
            errors.email = "Not a valid Email";
        }
    }

    if(!values.password){
        errors.password = "required";
    }

    return errors;
}

const asyncValidate = (values, dispatch) => {
    return dispatch(checkUserEmail(values.email)).catch(err => {
        throw {
            email: "Email is taken"
        };
    });
}

export {
    validate,
    asyncValidate
};
