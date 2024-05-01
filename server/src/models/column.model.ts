import { Schema, model } from "mongoose"
import { IColumn } from "~/@types/column.type"
import { COLLECTION_NAME, DOCUMENT_NAME } from "~/constants/model"

// Declare the Schema of the Mongo model
const schema = new Schema<IColumn>(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.BOARD
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    cardOrderIds: {
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
    collection: COLLECTION_NAME.COLUMNS
  }
)

export default model(DOCUMENT_NAME.COLUMN, schema)
