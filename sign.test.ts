import { Wallet } from "ethers"
import { arrayify, hashMessage, keccak256, recoverPublicKey, toUtf8Bytes } from "ethers/lib/utils"

describe("All tests", () => {
  it("test", async () => {
    const address = "0x03577C4ff7Ad2Edc8abF9FEE1aCCb97eea0DaE5D"
    const privateKey = "450e0b94415ee39ac3bc131b9354759c17a14cee5635f35b17db4301e0416bc9"
    const wallet = new Wallet(privateKey)
    expect(wallet.address).toBe(address)

    const message = "message"
    const sign = await wallet.signMessage(message)

    const recoveredPublicKey = recoverPublicKey(toUtf8Bytes(keccak256(
      arrayify(toUtf8Bytes(message))
    )), sign)

    console.log(recoveredPublicKey)

  })
})