export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
    
    // Ensure proper stack traces
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.message === 'Wallet not connected') {
    return new ApiError('Please connect your wallet to continue', 401);
  }

  if (error.response) {
    // Server responded with error
    const message = error.response.data?.error || 
      error.response.data?.message || 
      getErrorMessage(error.response.status);
    return new ApiError(
      message, 
      error.response.status, 
      error.response.data?.code,
      error.response.data
    );
  }
  
  if (error.request) {
    // Request made but no response
    if (!navigator.onLine) {
      return new ApiError('No internet connection. Please check your network.');
    }
    return new ApiError('Server not responding. Please try again later.');
  }
  
  // Error setting up request
  return new ApiError(error.message || 'An unexpected error occurred');
};

const getErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input and try again.';
    case 401:
      return 'Please connect your wallet to continue.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'This action conflicts with existing data.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Server error. Our team has been notified and is working on it.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};