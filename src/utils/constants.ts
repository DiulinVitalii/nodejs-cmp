export enum ORDER_STATUS {
  CREATED = 'created',
  COMPLETED = 'completed',
}

export const AUTH_ERROR = 'Header x-user-id is missing or no user with such id';
export const SOMETHING_WENT_WRONG = 'Ooops, something went wrong';
export const NO_PRODUCT = 'No product with such id';
export const NO_CART = 'No cart with such user id';
export const USER_ALREADY_EXIST = 'User Already Exist. Please Login';
export const INPUT_REQUIRED = 'All input is required';
export const USER_REGISTERED = 'User successfully registered';
export const INVALID_CREDENTIALS = 'Invalid Credentials';
export const INVALID_TOKEN = 'Invalid Token';
export const TOKEN_REQUIRED = 'Token is required';
export const FORBIDDEN = 'Forbidden';
