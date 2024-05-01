import { Schema, model } from "mongoose"
import { ICard } from "~/@types/card.type"
import { COLLECTION_NAME, DOCUMENT_NAME } from "~/constants/model"

// Declare the Schema of the Mongo model
const schema = new Schema<ICard>(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.BOARD
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: DOCUMENT_NAME.COLUMN
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    cover: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    commentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: DOCUMENT_NAME.COMMENT
      }
    ],
    attachmentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: DOCUMENT_NAME.ATTACHMENT
      }
    ],
    memberIds: [
      {
        type: Schema.Types.ObjectId,
        ref: DOCUMENT_NAME.MEMBER
      }
    ],
    _destroy: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false, // exclude __v
    collection: COLLECTION_NAME.CARDS
  }
)

export default model(DOCUMENT_NAME.CARD, schema)
