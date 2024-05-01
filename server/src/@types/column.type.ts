import { MongoObjectId } from "~/@types"
import { ICardDetailReturn } from "~/@types/card.type"

export interface IColumn {
  _id: MongoObjectId
  boardId: MongoObjectId
  title: string
  cardOrderIds: string[]
  _destroy: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IColumnDetailReturn {
  _id: string
  boardId: string
  title: string
  cardOrderIds: string[]
  _destroy: boolean
  createdAt: Date
  updatedAt: Date
  cards: ICardDetailReturn[]
}
