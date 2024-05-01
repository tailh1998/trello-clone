import { RequestHandler } from "express"
import { CREATED, OK } from "~/core/success.response"
import ColumnService from "~/services/column.service"

class ColumnController {
  createNew: RequestHandler = async (req, res) => {
    new CREATED({
      metadata: await ColumnService.createNew(req.body)
    }).send(res)
  }

  update: RequestHandler = async (req, res) => {
    new OK({
      metadata: await ColumnService.update(req.params.id, req.body)
    }).send(res)
  }

  deleteItem: RequestHandler = async (req, res) => {
    new OK({
      metadata: await ColumnService.deleteItem(req.params.id)
    }).send(res)
  }
}

export default new ColumnController()
