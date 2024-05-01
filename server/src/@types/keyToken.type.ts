import { Types } from "mongoose"

export type CreateKeyTokenParams = {
  userId: Types.ObjectId
  publicKey: string
  privateKey: string
  refreshToken?: string
}

export type DecodeUser = {
  userId: Types.ObjectId
  email: string
}
