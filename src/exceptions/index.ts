class RootException extends Error {
  message: string;
  status: number;
  error: any;

  constructor(message: string, status: number, error: any) {
    super(message);
    this.message = message;
    this.status = status;
    this.error = error;
  }
}

export default RootException;
