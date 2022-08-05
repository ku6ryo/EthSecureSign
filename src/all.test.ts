import { EthersSigner } from "./EthersSigner"
import { TokenIssuer } from "./TokenIssuer"
import { Web3JsSigner } from "./Web3JsSigner"

describe("All tests", () => {
  it("Using ethers success", async () => {
    const signer = new EthersSigner()
    const verifier = new TokenIssuer("secret")
    const message = verifier.issueToken()
    const sign = await signer.sign(message)
    const recoveredPublicKey = await verifier.verifyAndGetSignerAddress(message, sign)
    expect(recoveredPublicKey).toBe(signer.getAddress())
  })

  it("Using web3 succcess", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const message = verifier.issueToken()
    const sign = await signer.sign(message)
    const recoveredPublicKey = await verifier.verifyAndGetSignerAddress(message, sign)
    expect(recoveredPublicKey).toBe(signer.getAddress())
  })

  it("Using web3 fail because of invalid token", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = "Invalid token"
    const sign = await signer.sign(token)
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })

  it("Using web3 fail because of token expired", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken(new Date(0))
    const sign = await signer.sign(token)
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })

  it("Fail because of invalid sign", async () => {
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken()
    const sign = "Invalid sign"
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })
})