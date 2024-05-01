import { Types } from "mongoose"

import columnModel from "~/models/column.model"
import { IColumn } from "~/@types/column.type"

// z: Repo
import { updateColumnById } from "~/models/repositories/column.repo"
import { deleteManyByColumnId } from "~/models/repositories/card.repo"
import { pullColumnOrderIds, pushColumnOrderIds } from "~/models/repositories/board.repo"

import { NotFoundError } from "~/core/error.response"

class ColumnService {
  static createNew = async (body: IColumn) => {
    try {
      const newColumn = await columnModel.create(body)

      if (newColumn) {
        await pushColumnOrderIds(newColumn)
        // if update fail, delete newColumn in DB
      }

      return newColumn
    } catch (error) {
      throw error
    }
  }

  static update = async (id: string, body: IColumn) => {
    try {
      return await updateColumnById(id, body)
    } catch (error) {
      throw error
    }
  }

  static deleteItem = async (id: string) => {
    try {
      const column = await columnModel.findById(id)
      if (!column) throw new NotFoundError()
      await column.deleteOne({
        _id: new Types.ObjectId(id)
      })

      await deleteManyByColumnId(id)
      await pullColumnOrderIds(column)
      return "Column and its Cards deleted successfully!"
    } catch (error) {
      throw error
    }
  }
}

export default ColumnService
