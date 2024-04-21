import RootException from ".";

class UnProcessableEntity extends RootException {
  constructor(message: string, error: any) {
    super(message, 422, error);
  }
}

export default UnProcessableEntity;
