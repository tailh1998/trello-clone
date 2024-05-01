import { RequestHandler } from "express"
import { RequestCustom } from "~/@types/auth.type"
import AccessService from "~/services/access.service"
import { CREATED, SuccessResponse } from "~/core/success.response"

class AccessController {
  signUp: RequestHandler = async (req, res) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AccessService.signUp(req.body)
    }).send(res)
  }

  login: RequestHandler = async (req, res) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

  logout: RequestHandler = async (req, res) => {
    const customRequest = req as unknown as RequestCustom // ! skip for now , fix after
    new SuccessResponse({
      message: "Logout Success !!!",
      metadata: await AccessService.logout(customRequest.keyStore)
    }).send(res)
  }

  renewToken: RequestHandler = async (req, res) => {
    const customRequest = req as unknown as RequestCustom // ! skip for now , fix after
    new SuccessResponse({
      message: "Get token success!!!",
      metadata: await AccessService.renewToken({
        refreshToken: customRequest.refreshToken,
        user: customRequest.user,
        keyStore: customRequest.keyStore
      })
    }).send(res)
  }
}

export default new AccessController()
