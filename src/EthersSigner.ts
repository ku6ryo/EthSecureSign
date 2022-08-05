import { ethers, Wallet } from "ethers";
import { Signer } from "./Signer";

export class EthersSigner implements Signer {
  #wallet: Wallet
  constructor() {
    this.#wallet = ethers.Wallet.createRandom()
  }

  getAddress() {
    return this.#wallet.address
  }

  async sign(message: string) {
    return await this.#wallet.signMessage(message)
  }
}