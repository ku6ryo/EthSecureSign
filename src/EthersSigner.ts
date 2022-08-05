import { ethers, Wallet } from "ethers";
import { ISigner } from "./ISigner";

export class EthersSigner implements ISigner {
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