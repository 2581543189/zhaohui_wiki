package router

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/po"
	"backend-golang/src/model/request"
	"backend-golang/src/model/response"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"reflect"
)

func initEventRoute(Router *gin.RouterGroup) {
	Router.Group("event").Use(middleware.Auth())
	{
		global.GroupApi.POST("event", eventAll)
	}

}

// @Tags Event
// @Summary 查询用户
// @Produce  application/json
// @Param data body request.EventQueryRequest true "查询一个用户"
// @Success      200  {object}  response.Response
// @Router /api/v1/event [post]
func eventAll(c *gin.Context) {
	req := request.DefaultEventQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	where := make(map[string]interface{})
	if len(req.Type) > 0 {
		where["event.type = ?"] = req.Type
	}
	query := &util.PaginationQuery{
		Limit:  req.Limit,
		Offset: uint(req.Offset),
		Order:  "`gmt_create` desc, `type` desc",
		Where:  where,
	}
	list, _, err := (&po.Event{}).All(query)
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
