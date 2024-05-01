import { BOARD_TYPES } from "~/constants"
import { MongoObjectId } from "~/@types"
import { IColumnDetailReturn } from "~/@types/column.type"
import { ICardDetailReturn } from "~/@types/card.type"

type KBoardType = keyof typeof BOARD_TYPES
type VBoardType = (typeof BOARD_TYPES)[KBoardType]

export interface IBoard {
  _id: MongoObjectId
  userId: MongoObjectId
  title: string
  type: VBoardType
  slug: string
  description: string
  columnOrderIds: string[]
  _destroy: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IBoardDetailReturn {
  _id: string
  title: string
  type: VBoardType
  slug: string
  description: string
  columnOrderIds: string[]
  createdAt: Date
  updatedAt: Date
  columns: IColumnDetailReturn[]
  cards: ICardDetailReturn[]
}
