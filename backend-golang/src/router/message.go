package router

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/po"
	"backend-golang/src/model/request"
	"backend-golang/src/model/response"
	"backend-golang/src/service"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"reflect"
)

func initMessageRoute(Router *gin.RouterGroup) {
	Router.Group("message").Use(middleware.Auth())
	{
		global.GroupApi.POST("message", messageAll)
		global.GroupApi.POST("message/add", messageAdd)
	}

}

// @Tags Message
// @Summary 查询留言
// @Produce  application/json
// @Param data body request.MessageQueryRequest true "查询留言"
// @Success      200  {object}  response.Response
// @Router /api/v1/message [post]
func messageAll(c *gin.Context) {
	req := request.DefaultMessageQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	query := &util.PaginationQuery{
		Limit:  req.Limit,
		Offset: uint(req.Offset),
		Order:  "gmt_create desc",
	}
	list, _, err := (&po.Message{}).All(query)
	newOffset := req.Offset
	if list != nil && len(*list) > 0 {
		newOffset += len(*list)
	}
	if util.HandleError(c, err) {
		return
	}
	data := response.StreamResponse{newOffset, list}
	util.JsonData(c, data)
}

// @Tags User
// @Summary 新增留言
// @Produce  application/json
// @Param data body request.MessageAddOrUpdateRequest true "新增留言"
// @Success      200  {object}  response.Response
// @Router /api/v1/message/add [post]
func messageAdd(c *gin.Context) {
	var req request.MessageAddOrUpdateRequest
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	msg := po.NewMessage(req)
	err := msg.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	service.AddEvent(msg)
	util.JsonData(c, msg)
}
