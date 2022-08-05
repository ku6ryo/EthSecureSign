import { EthersSigner } from "./EthersSigner"
import { TokenIssuer } from "./TokenIssuer"
import { Web3JsSigner } from "./Web3JsSigner"

describe("All tests", () => {

  it("Using ethers, succeeds", async () => {
    const signer = new EthersSigner()
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken(signer.getAddress())
    const sign = await signer.sign(token)
    const recoveredPublicKey = await verifier.verifyAndGetSignerAddress(token, sign)
    expect(recoveredPublicKey).toBe(signer.getAddress())
  })

  it("Using web3, succceeds", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken(signer.getAddress())
    const sign = await signer.sign(token)
    const recoveredPublicKey = await verifier.verifyAndGetSignerAddress(token, sign)
    expect(recoveredPublicKey).toBe(signer.getAddress())
  })

  it("Using web3, fails because of the invalid token", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = "Invalid token"
    const sign = await signer.sign(token)
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })

  it("Using web3, fails because of the token expired", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken(signer.getAddress(), new Date(0))
    const sign = await signer.sign(token)
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })

  it("Using web3, fails because of the invalid sign", async () => {
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken(signer.getAddress())
    const sign = "Invalid sign"
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })

  it("Using web3, fails because of the token is not for the signer", async () => {
    const forToken = new Web3JsSigner()
    const signer = new Web3JsSigner()
    const verifier = new TokenIssuer("secret")
    const token = verifier.issueToken(forToken.getAddress())
    const sign = await signer.sign(token)
    await expect((async () => {
      await verifier.verifyAndGetSignerAddress(token, sign)
    })()).rejects.toThrow()
  })
})