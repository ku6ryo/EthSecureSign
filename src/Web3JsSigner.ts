import Web3 from "web3"
import { Account } from "web3-core"

export class Web3JsSigner {
  #account: Account

  constructor() {
    const web3 = new Web3()
    this.#account = web3.eth.accounts.create()
  }

  getAddress() {
    return this.#account.address
  }

  async sign(message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const sign = this.#account.sign(message)
        resolve(sign.signature)
      } catch (e) {
        reject(e)
      }
    })
  }
}