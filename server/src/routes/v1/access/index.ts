import express from "express"
import { authentication } from "~/auth/auth.utils"
import accessController from "~/controllers/access.controller"
import { asyncHandler } from "~/middleware/error.middleware"
import { loginValidation, signUpValidation } from "~/validations/access.validation"

const accessRouter = express.Router()

/**
 * @openapi
 * '/v1/api/user/signup':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
accessRouter.post("/user/signup", signUpValidation, asyncHandler(accessController.signUp))

/**
 * @openapi
 * '/v1/api/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: User login to my app
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
accessRouter.post("/user/login", loginValidation, asyncHandler(accessController.login))

// z: Authentication Middleware
accessRouter.use(authentication)

/**
 * @openapi
 * '/v1/api/user/logout':
 *  post:
 *     tags:
 *     - User
 *     summary: User logout to my app
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
accessRouter.post("/user/logout", asyncHandler(accessController.logout))

/**
 * @openapi
 * '/v1/api/user/renew-token':
 *  post:
 *     tags:
 *     - User
 *     summary: get new token based on refresh token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
accessRouter.post("/user/renew-token", asyncHandler(accessController.renewToken))

export default accessRouter
