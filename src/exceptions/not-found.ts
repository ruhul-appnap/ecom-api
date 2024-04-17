import RootException from ".";

class NotFoundException extends RootException {
  constructor(message: string) {
    super(message, 400, null);
  }
}

export default NotFoundException;
