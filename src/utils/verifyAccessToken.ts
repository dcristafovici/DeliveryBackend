import jwt from 'jsonwebtoken';
import httpError from 'http-errors';

const { JWT_SECRET } = process.env;

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
  }
}
export const verifyAccessToken = (
  fullToken: string,
): Promise<jwt.JwtPayload> => {
  const typeOfToken = fullToken.split(' ')[0];
  typeOfToken !== 'Bearer' && new httpError.Unauthorized();

  const token = fullToken.split(' ')[1];

  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload: jwt.JwtPayload) => {
      if (err) {
        return reject(new httpError.Unauthorized());
      }
      return resolve(payload);
    });
  });
};
