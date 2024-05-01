import { Types } from "mongoose"
import { cloneDeep } from "lodash"

import boardModel from "~/models/board.model"
import { IBoard } from "~/@types/board.type"
import { IMoveCardToDiffColProps } from "~/@types/card.type"

// z: Repo
import { updateCardById } from "~/models/repositories/card.repo"
import { updateColumnById } from "~/models/repositories/column.repo"
import { getBoardDetails, updateBoardById } from "~/models/repositories/board.repo"

import { mapOrder } from "~/utils/sorts"
import { slugify } from "~/utils/formatter"
import { NotFoundError } from "~/core/error.response"

export interface RequestCustom extends Request {
  user: {
    userId: string
    email: string
    iat: number
    exp: number
  }
}

class BoardService {
  static createNew = async (body: IBoard) => {
    try {
      const newBoard = {
        ...body,
        slug: slugify(body.title)
      }

      return await boardModel.create(newBoard)
    } catch (error) {
      throw error
    }
  }

  static update = async (id: string, body: IBoard) => {
    try {
      return await updateBoardById(id, body)
    } catch (error) {
      throw error
    }
  }

  static getDetails = async (data: { id: string; userId: string }) => {
    const { id, userId } = data
    try {
      const board = await getBoardDetails(id, userId)
      if (!board) throw new NotFoundError()
      const newBoard = cloneDeep(board)
      newBoard.cards.forEach((c) => (c._id = c._id.toString()))
      const newColumns = newBoard.columns.map((x) => {
        const newCards = newBoard.cards.filter((c) => c.columnId.toString() === x._id.toString())
        const orderedNewCards = mapOrder(newCards, x.cardOrderIds, "_id")
        return {
          ...x,
          cards: orderedNewCards,
          _id: x._id.toString()
        }
      })
      newBoard.columns = newColumns
      newBoard.columns = mapOrder(newBoard.columns, newBoard.columnOrderIds, "_id")
      const { cards, ...data } = newBoard

      return { ...data }
    } catch (error) {
      throw error
    }
  }

  static moveCardToDiffColumn = async (body: IMoveCardToDiffColProps) => {
    try {
      await updateColumnById(body.prevColumnId, {
        cardOrderIds: body.prevCardOrderIds
      })
      await updateColumnById(body.nextColumnId, {
        cardOrderIds: body.nextCardOrderIds
      })
      await updateCardById(body.currentCardId, {
        columnId: new Types.ObjectId(body.nextColumnId)
      })

      return {
        updateResult: "Successfully!"
      }
    } catch (error) {
      throw error
    }
  }
}

export default BoardService
