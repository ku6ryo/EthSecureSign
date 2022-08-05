import { verifyMessage } from "ethers/lib/utils"
import jwt from "jsonwebtoken"

/**
 * Issues token and verifies signed token / returns singer address.
 */
export class TokenIssuer {
  /**
   * Issuer embedded in JWT.
   */
  #issuer: string = "ETH_SESURE_SIGN_TOKEN_ISSUER"
  /**
   * Subject embedded in JWT.
   */
  #subject: string = "ETH_SECURE_SIGN"
  /**
   * Secret to sign JWTs.
   */
  #secret: string
  /**
   * Expiration time in seconds.
   */
  #expiresIn: number

  /**
   * @param secret Secert for signing the tokens.
   * @param expiresIn Time limit in sec of token.
   */
  constructor(secret: string, expiresIn = 30) {
    this.#secret = secret
    this.#expiresIn = expiresIn
  }

  /**
   * @param expiresAt Optional. Do not use except for testing.
   * @returns Token
   */
  issueToken(expiresAt?: Date) {
    return jwt.sign({
      exp: Math.floor((expiresAt ? expiresAt.getTime() : Date.now()) / 1000) + this.#expiresIn,
      sub: this.#subject,
      iss: this.#issuer,
    }, this.#secret);
  }

  /**
   * Just verifies a token and throw error when invalid.
   * @param token JWT
   * @returns 
   */
  async verifyToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.#secret, (err, payload) => {
        if (err) {
          throw err
        }
        try {
          if (typeof payload !== "object") {
            throw new Error("Invalid token")
          }
          if (payload.sub !== this.#subject) {
            throw new Error("Invalid subject")
          }
          if (payload.iss !== this.#issuer) {
            throw new Error("Invalid issuer")
          }
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  /**
   * Verifies the token and return the signer address.
   * @param token 
   * @param sign 
   * @returns 
   */
  async verifyAndGetSignerAddress(token: string, sign: string): Promise<string> {
    await this.verifyToken(token)
    return verifyMessage(token, sign)
  }
}