import { jwtDecode } from 'jwt-decode';
import { User, AuthResponse } from '../types';

// Token storage keys
const TOKEN_KEY = 'fanconnect_token';
const USER_KEY = 'fanconnect_user';

// JWT token interface
interface JwtToken {
  exp: number;
  iat: number;
  userId: string;
  email: string;
  role: string;
}

// Auth utility functions
export const authUtils = {
  // Store authentication data
  setAuthData: (authResponse: AuthResponse): void => {
    const { user, token } = authResponse;
    
    // Store token and user in localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      ...user,
      token // Include token in user object for convenience
    }));
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem(USER_KEY);
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      
      // Check if token is still valid
      if (user.token && !authUtils.isTokenValid(user.token)) {
        authUtils.clearAuthData();
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      authUtils.clearAuthData();
      return null;
    }
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    if (!token) return false;
    
    return authUtils.isTokenValid(token);
  },

  // Check if token is valid and not expired
  isTokenValid: (token: string): boolean => {
    try {
      const decoded: JwtToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  },

  // Get token expiration date
  getTokenExpiration: (token: string): Date | null => {
    try {
      const decoded: JwtToken = jwtDecode(token);
      return new Date(decoded.exp * 1000);
    } catch (error) {
      console.error('Error getting token expiration:', error);
      return null;
    }
  },

  // Clear authentication data (logout)
  clearAuthData: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check if user has specific role
  hasRole: (role: string): boolean => {
    const user = authUtils.getCurrentUser();
    return user?.role === role;
  },

  // Check if user is a creator
  isCreator: (): boolean => {
    return authUtils.hasRole('creator');
  },

  // Check if user is a fan
  isFan: (): boolean => {
    return authUtils.hasRole('fan');
  },

  // Check if current user is the profile owner
  isProfileOwner: (userId: string): boolean => {
    const user = authUtils.getCurrentUser();
    return user?.id === userId;
  },

  // Check if age is verified
  isAgeVerified: (): boolean => {
    const user = authUtils.getCurrentUser();
    return user?.ageVerified || false;
  },

  // Require authentication - redirect to login if not authenticated
  requireAuth: (): boolean => {
    if (!authUtils.isAuthenticated()) {
      // Store intended destination for redirect after login
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== '/login') {
        localStorage.setItem('redirect_path', currentPath);
      }
      
      window.location.href = '/login';
      return false;
    }
    return true;
  },

  // Require specific role
  requireRole: (role: string): boolean => {
    if (!authUtils.isAuthenticated()) {
      authUtils.requireAuth();
      return false;
    }
    
    if (!authUtils.hasRole(role)) {
      // Redirect to unauthorized page or home
      window.location.href = '/unauthorized';
      return false;
    }
    
    return true;
  },

  // Require creator role
  requireCreator: (): boolean => {
    return authUtils.requireRole('creator');
  },

  // Get redirect path after login
  getRedirectPath: (): string => {
    const path = localStorage.getItem('redirect_path') || '/';
    localStorage.removeItem('redirect_path');
    return path;
  },

  // Update user data in storage (e.g., after profile update)
  updateUserData: (updatedUser: Partial<User>): void => {
    const currentUser = authUtils.getCurrentUser();
    if (currentUser) {
      const mergedUser = { ...currentUser, ...updatedUser };
      localStorage.setItem(USER_KEY, JSON.stringify(mergedUser));
    }
  },

  // Validate password strength
  validatePassword: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  },

  // Generate random password (for reset or temporary passwords)
  generateRandomPassword: (length: number = 12): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
    let password = '';
    
    // Ensure at least one of each required character type
    password += 'A'; // uppercase
    password += 'a'; // lowercase
    password += '1'; // number
    password += '@'; // special
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }
};

export default authUtils;