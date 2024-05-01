import { Document, Types } from "mongoose"
import { IKeyToken } from "~/models/keyToken.model"
import { DecodeUser } from "./keyToken.type"

export type KeyStoreParam = Document<unknown, {}, IKeyToken> &
  IKeyToken & {
    _id: Types.ObjectId
  }

export interface RequestCustom extends Request {
  refreshToken?: string
  user?: DecodeUser
  keyStore?: KeyStoreParam
}
