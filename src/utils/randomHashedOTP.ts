import * as bcrypt from 'bcrypt';

export const randomHashedOTP = async () => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const hashedOTP = await bcrypt.hash(
    code,
    parseFloat(process.env.saltOrRounds),
  );
  return { code, hashedOTP };
};

export const compareCodes = async (
  code: string,
  hashedCode: string,
): Promise<boolean> => {
  return bcrypt.compare(code, hashedCode);
};
