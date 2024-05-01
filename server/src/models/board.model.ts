import { Schema, model } from "mongoose"
import { IBoard } from "~/@types/board.type"
import { BOARD_TYPES } from "~/constants"
import { COLLECTION_NAME, DOCUMENT_NAME } from "~/constants/model"

// Declare the Schema of the Mongo model
const schema = new Schema<IBoard>(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    type: {
      type: String,
      required: true,
      default: BOARD_TYPES.PRIVATE,
      enum: Object.values(BOARD_TYPES)
    },
    slug: {
      type: String,
      min: 3
    },
    description: {
      type: String,
      min: 3,
      max: 255
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.USER
    },
    columnOrderIds: {
      type: [String],
      default: []
    },
    _destroy: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false, // exclude __v
    collection: COLLECTION_NAME.BOARDS
  }
)

export default model(DOCUMENT_NAME.BOARD, schema)
