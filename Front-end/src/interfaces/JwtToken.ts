export interface JwtTokenI {
  userName: string;
  expiresIn: number;
  secret: string;
  exp: number;
}