import jwt from "jsonwebtoken";
import TokenModel from "../models/token";

const { JWT_ACCESS_SECRET_KEY = "", JWT_REFRESH_SECRET_KEY = "" } = process.env;

class TokenService {
  async generate(payload: any) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
      expiresIn: "10d",
    });
    return { accessToken, refreshToken };
  }

  async save(userId: string, refreshToken: string) {
    const token = await TokenModel.findOne({ user: userId });
    if (token) {
      token.refreshToken = refreshToken;
      return token.save();
    }
    return await TokenModel.create({ user: userId, refreshToken });
  }

  async validateAccess(token: string) {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  async validateRefresh(token: string) {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET_KEY);
    } catch (error) {
      return null;
    }
  }

  async find(refreshToken: string) {
    return await TokenModel.findOne({ refreshToken });
  }

  async remove(refreshToken: string) {
    return await TokenModel.deleteOne({ refreshToken });
  }
}

export default new TokenService();
