import { Types } from "mongoose"
import { ICard } from "~/@types/card.type"
import { IColumn } from "~/@types/column.type"
import columnModel from "~/models/column.model"

export const updateColumnById = async (id: string, updateData: Partial<IColumn>) => {
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

  return await columnModel.findOneAndUpdate(filter, update, options)
}

export const pushCardOrderIds = async (card: ICard) => {
  const filter = {
      _id: new Types.ObjectId(card.columnId)
    },
    update = {
      $push: { cardOrderIds: new Types.ObjectId(card._id) }
    },
    options = {
      upsert: true,
      new: true
    }

  return await columnModel.findOneAndUpdate(filter, update, options)
}
