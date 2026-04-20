export interface JwtPayloadInterface {
  sub: number;
  uuid: string;
  email: string;
  role_id: number;
  role: string;
}

export interface DecodedTokenInterface extends JwtPayloadInterface {
  exp: number;
  iat: number;
}
