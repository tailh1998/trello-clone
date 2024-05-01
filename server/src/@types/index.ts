import { Types } from "mongoose"

export interface MongoObjectId extends Types.ObjectId {}

export interface SelectData extends Record<string, 1> {}

export interface UnselectData extends Record<string, 0> {}
