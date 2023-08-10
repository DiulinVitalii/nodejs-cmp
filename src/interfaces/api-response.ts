export interface ApiResponse {
  data: any;
  error: ErrorResponse | null
}

interface ErrorResponse {
  message: string
}
