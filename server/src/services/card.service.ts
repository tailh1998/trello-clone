import { ICard } from "~/@types/card.type"
import cardModel from "~/models/card.model"

import { pushCardOrderIds } from "~/models/repositories/column.repo"

class CardService {
  static createNew = async (body: ICard) => {
    try {
      const newCard = await cardModel.create(body)

      if (newCard) {
        await pushCardOrderIds(newCard)
        // if update fail, delete newCard in DB
      }

      return newCard
    } catch (error) {
      throw error
    }
  }
}

export default CardService
