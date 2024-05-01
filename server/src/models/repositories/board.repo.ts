import { Types, isValidObjectId } from "mongoose"
import { getUnSelectData } from "~/utils"
import { IColumn } from "~/@types/column.type"
import { COLLECTION_NAME } from "~/constants/model"
import { NotFoundError } from "~/core/error.response"
import { IBoard, IBoardDetailReturn } from "~/@types/board.type"
import boardModel from "~/models/board.model"

const UNSELECT_DEFAULT = getUnSelectData(["_destroy", "userId"])

export const getBoardDetails = async (id: string, userId: string): Promise<IBoardDetailReturn> => {
  if (!isValidObjectId(id)) throw new NotFoundError()

  try {
    const result = await boardModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          userId: new Types.ObjectId(userId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: COLLECTION_NAME.COLUMNS,
          localField: "_id",
          foreignField: "boardId",
          as: "columns",
          pipeline: [
            {
              $project: UNSELECT_DEFAULT
            }
          ]
        }
      },
      {
        $lookup: {
          from: COLLECTION_NAME.CARDS,
          localField: "_id",
          foreignField: "boardId",
          as: "cards",
          pipeline: [
            {
              $project: UNSELECT_DEFAULT
            }
          ]
        }
      },
      {
        $project: UNSELECT_DEFAULT
      }
    ])

    return result[0] || null
  } catch (error) {
    throw new NotFoundError()
  }
}

export const updateBoardById = async (id: string, updateData: IBoard) => {
  const filter = {
      _id: new Types.ObjectId(id)
    },
    update = {
      ...updateData,
      updatedAt: Date.now()
    },
    options = {
      upsert: true,
      new: true
    }

  return await boardModel.findOneAndUpdate(filter, update, options)
}

export const pushColumnOrderIds = async (column: IColumn) => {
  const filter = {
      _id: new Types.ObjectId(column.boardId)
    },
    update = {
      $push: {
        columnOrderIds: new Types.ObjectId(column._id)
      }
    },
    options = {
      upsert: true,
      new: true
    }

  try {
    return await boardModel.findOneAndUpdate(filter, update, options)
  } catch (error) {
    throw error
  }
}

export const pullColumnOrderIds = async (column: IColumn) => {
  const filter = {
      _id: new Types.ObjectId(column.boardId)
    },
    update = {
      $pull: {
        columnOrderIds: new Types.ObjectId(column._id)
      }
    },
    options = {
      upsert: true,
      new: true
    }

  try {
    return await boardModel.findOneAndUpdate(filter, update, options)
  } catch (error) {
    throw error
  }
}
