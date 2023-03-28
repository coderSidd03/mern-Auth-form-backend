
//* USER DETAILS VALIDATIONS *//
export const isValidName = (name) => { return ((/^[a-zA-Z ]+$/).test(name)); };
export const isValidPhone = (phone) => { return ((/^[6789][0-9]{9}$/g).test(phone)); };
export const isValidEmail = (email) => { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email); };
export const isValidPassword = (password) => { return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/).test(password); };    
