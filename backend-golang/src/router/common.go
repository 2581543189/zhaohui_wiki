package router

import (
	"backend-golang/src/model/po"
	"backend-golang/src/model/request"
	"backend-golang/src/model/response"
	"backend-golang/src/service"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func initCommonRoute(Router *gin.RouterGroup) {
	BaseRouter := Router.Group("common")
	{
		BaseRouter.POST("login", login)
	}
}

// @Tags Common
// @Summary 用户登录
// @Produce  application/json
// @Param data body request.LoginRequest true "用户登录接口"
// @Success      200  {object}  response.Response
// @Router /api/v1/common/login [post]
func login(c *gin.Context) {
	var req request.LoginRequest
	_ = c.ShouldBindJSON(&req)
	if req.Username == "" || req.Password == "" {
		response.FailWithMessage("参数错误", c)
		return
	}
	user := &po.User{
		Name:     req.Username,
		Password: req.Password,
	}
	u, err := service.Login(user)
	if util.HandleErrorWithData(c, u, err) {
		return
	}
	service.GenerateTokenForUser(c, u)
}
