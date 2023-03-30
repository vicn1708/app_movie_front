import { AuthService } from "../services/auth/auth.service";

export const AuthController = {
  loginPage: AuthService.loginPage,
  logOut: AuthService.logOut,
};
