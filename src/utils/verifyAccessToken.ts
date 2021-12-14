import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

const { JWT_SECRET } = process.env;

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
  }
}
export const verifyAccessToken = (
  token: string,
): Promise<jwt.JwtPayload | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET as string, (err, payload) => {
      if (err) {
        return reject(new httpError.Unauthorized());
      }
      return resolve(payload);
    });
  });
};
