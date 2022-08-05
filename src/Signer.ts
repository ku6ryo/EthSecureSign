
export interface Signer {
  /**
   * Returns address of the signer.
   */
  getAddress(): string

  /**
   * Signs a massage
   */
  sign(message: string): Promise<string>
}