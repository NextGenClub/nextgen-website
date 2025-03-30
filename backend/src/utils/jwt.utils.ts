import jwt from 'jsonwebtoken';

// JWT Secret from environment or default
const JWT_SECRET = process.env.JWT_SECRET || 'nextgen_default_secret';

// Token expiration time
const TOKEN_EXPIRATION = '7d'; // 7 days

/**
 * Generate JWT token for a user
 * @param userId - User ID to include in the token
 * @returns JWT token string
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
};

/**
 * Verify a JWT token
 * @param token - JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): any | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};