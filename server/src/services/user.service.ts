import { SelectData } from "~/@types"
import userModel from "~/models/user.model"
import { getSelectData } from "~/utils"

const SELECT_DEFAULT = ["email", "password", "name", "status", "roles"]

export const findByEmail = async ({
  email,
  select = getSelectData(SELECT_DEFAULT)
}: {
  email: string
  select?: SelectData
}) => await userModel.findOne({ email }).select(select).lean()
