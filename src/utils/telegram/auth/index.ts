export * from './validation';
export * from './session';
export * from './api';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const initializeAuth = async (initData: string) => {
  try {
    // Validate initialization data
    if (!validateInitData(initData)) {
      throw new AuthError('Invalid initialization data');
    }

    // Parse init data
    const data = new URLSearchParams(initData);
    const authDate = parseInt(data.get('auth_date') || '0', 10);

    // Validate auth date
    if (!validateAuthDate(authDate)) {
      throw new AuthError('Authentication data has expired');
    }

    // Authenticate with server
    const authResult = await authenticateUser(initData);
    return authResult;
  } catch (error) {
    console.error('Auth initialization error:', error);
    throw error instanceof AuthError ? error : new AuthError('Authentication failed');
  }
};