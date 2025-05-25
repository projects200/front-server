export interface ApiResponse<T> {
  succeed: boolean;
  code: string;
  message: string;
  data: T;
}