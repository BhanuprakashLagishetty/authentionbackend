class ClientErrorResponse {
  status: number;
  message: string;
  data: any;
  constructor(status: number, message: string, error: any) {
    this.status = status;
    this.message = message;
    this.data = error;
  }
}

export default ClientErrorResponse;
