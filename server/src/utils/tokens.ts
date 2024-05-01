import crypto from "crypto"

export const generateTokens = () => {
  const privateKey = crypto.randomBytes(64).toString("hex")
  const publicKey = crypto.randomBytes(64).toString("hex")

  return {
    privateKey,
    publicKey
  }
}
