import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  status: StatusCodes;

  constructor(message: string, status: StatusCodes) {
    super(message);

    this.status = status;
    // Set the prototype explicitly to ensure proper inheritance
    Object.setPrototypeOf(this, CustomError.prototype);

    // Ensure that the name property is set to the class name
    this.name = this.constructor.name;
  }
}
