import { Types } from "mongoose"
import { ICard } from "~/@types/card.type"
import cardModel from "~/models/card.model"

export const updateCardById = async (id: string, updateData: Partial<ICard>) => {
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

  return await cardModel.findOneAndUpdate(filter, update, options)
}

export const deleteManyByColumnId = async (columnId: string) => {
  try {
    return await cardModel.deleteMany({
      columnId: new Types.ObjectId(columnId)
    })
  } catch (error) {
    throw error
  }
}
