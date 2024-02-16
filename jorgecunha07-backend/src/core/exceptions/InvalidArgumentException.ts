//Custom class for exception.
export default class InvalidArgumentException extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidArgumentException.prototype);
  }
}
