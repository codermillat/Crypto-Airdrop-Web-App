export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.error || 
      error.response.data?.message || 
      getErrorMessage(error.response.status);
    return new ApiError(message, error.response.status);
  } else if (error.request) {
    // Request made but no response
    return new ApiError('Network error. Please check your connection.');
  } else {
    // Error setting up request
    return new ApiError(error.message || 'An unexpected error occurred');
  }
};

const getErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'Invalid request. Please try again.';
    case 401:
      return 'Please connect your wallet to continue.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred.';
  }
};