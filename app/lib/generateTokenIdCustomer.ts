import bcrypt from "bcryptjs";
const generateTokenId = async (userId: string) => {
  try {
    const hashedAuthId = await bcrypt.hash(userId, 10);

    return hashedAuthId;
  } catch (err) {
    let errorMessage = "Error has occured";
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    throw new Error(errorMessage);
  }
};

export default generateTokenId;
