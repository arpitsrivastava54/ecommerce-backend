export class ApiResponse {
  data:any;
  success:boolean;
  message:string;

  constructor(message = "success",data:any) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}