import { Schema, model } from "mongoose"
import { COLLECTION_NAME, DOCUMENT_NAME } from "~/constants/model"
export interface IUser {
  name?: string
  email?: string
  password: string
  status?: "active" | "inactive"
  verify: boolean
  roles?: string[]
}

// Declare the Schema of the Mongo model
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150
    },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    verify: {
      type: Boolean,
      default: false
    },
    roles: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false, // exclude __v
    collection: COLLECTION_NAME.USERS
  }
)

//Export the model
const userModel = model(DOCUMENT_NAME.USER, userSchema)

export default userModel
