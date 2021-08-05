export default interface JwtToken {
  userName: string;
  expiresIn: number;
  secret: string;
}