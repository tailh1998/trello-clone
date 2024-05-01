import { MongoObjectId } from "~/@types"

export interface ICard {
  _id: MongoObjectId
  boardId: MongoObjectId
  columnId: MongoObjectId
  title: string
  cover: string
  description: string
  commentIds: [MongoObjectId]
  attachmentIds: [MongoObjectId]
  memberIds: [MongoObjectId]
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
}

export interface ICardDetailReturn {
  _id: string
  boardId: string
  columnId: string
  title: string
  cover: string
  description: string
  commentIds: [string]
  attachmentIds: [string]
  memberIds: [string]
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
}

export interface IMoveCardToDiffColProps {
  prevColumnId: string
  nextColumnId: string
  currentCardId: string
  nextCardOrderIds: string[]
  prevCardOrderIds: string[]
}
