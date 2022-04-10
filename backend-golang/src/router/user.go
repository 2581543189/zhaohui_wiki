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
	"strconv"
	"strings"
)

func initUserRoute(Router *gin.RouterGroup) {
	Router.Group("user").Use(middleware.Auth())
	{
		global.GroupApi.POST("user", userAll)
		global.GroupApi.POST("user/add", userAdd)
		global.GroupApi.POST("user/delete/:id", userDelete)
		global.GroupApi.POST("user/update/:id", userUpdate)
	}

}

// @Tags User
// @Summary 查询用户
// @Produce  application/json
// @Param data body request.UserQueryRequest true "查询用户"
// @Success      200  {object}  response.Response
// @Router /api/v1/user [post]
func userAll(c *gin.Context) {
	req := request.DefaultUserQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter("user", req.Sorter)
	where := make(map[string]interface{})
	if len(req.Name) > 0 {
		where["name like ?"] = "%" + req.Name + "%"
	}
	if req.Id > 0 {
		where["id = ?"] = req.Id
	}
	if len(req.Role) > 0 {
		where["role in (?)"] = strings.Split(req.Role, ",")
	}

	query := &util.PaginationQuery{
		Limit:  req.PageSize,
		Offset: req.PageSize * (req.CurrentPage - 1),
		Order:  order,
		Where:  where,
	}
	list, total, err := (&po.User{}).All(query)
	if util.HandleError(c, err) {
		return
	}
	data := response.PageResponse{total, list}
	util.JsonData(c, data)
}

// @Tags User
// @Summary 新增用户
// @Produce  application/json
// @Param data body request.UserAddOrUpdateRequest true "新增用户"
// @Success      200  {object}  response.Response
// @Router /api/v1/user/add [post]
func userAdd(c *gin.Context) {
	var req request.UserAddOrUpdateRequest
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	user := po.NewUser(req)
	err := user.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, user)
}

// @Tags User
// @Summary 删除用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/user/delete/{id} [post]
func userDelete(c *gin.Context) {
	var mdl po.User
	id, err := util.ParseParamID(c)
	if util.HandleError(c, err) {
		return
	}
	mdl.Id = id
	err = mdl.Delete()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, mdl)
}

// @Tags User
// @Summary 更新用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/user/update/{id} [post]
func userUpdate(c *gin.Context) {
	var req request.UserAddOrUpdateRequest
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	id, err := util.ParseParamID(c)
	if util.HandleError(c, err) {
		return
	}
	user := po.User{}
	user.Id = id
	inDb, err := user.One()
	if util.HandleError(c, err) {
		return
	}
	if inDb == nil {
		response.FailWithMessage("未找到用户"+strconv.Itoa(int(req.Id)), c)
	}
	user = po.NewUser(req)
	user.Update()
	util.JsonData(c, user)
}
