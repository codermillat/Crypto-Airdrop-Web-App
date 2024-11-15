export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export const handleApiError = (error: any): ApiError => {
  const errorMessage = error?.response?.data?.error || 
    error?.response?.data?.message || 
    error?.message || 
    'An unexpected error occurred';

  const status = error?.response?.status;
  const code = error?.response?.data?.code;

  return new ApiError(errorMessage, status, code);
};