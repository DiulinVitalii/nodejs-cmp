export interface ApiResponseModel {
  data: any;
  error: ErrorResponseModel | null
}

interface ErrorResponseModel {
  message: string
}
