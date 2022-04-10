package handlers

import (
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("userOne", userOne)
	//global.GroupApi.POST("user", userCreateUserOfRole)
	//global.GroupApi.PATCH("user", userUpdate)
	//global.GroupApi.DELETE("user/:id", userDelete)
}

//All
func userAll(c *gin.Context) {
	mdl := po.User{}
	query := &util.PaginationQuery{}
	err := c.ShouldBindQuery(query)
	if util.HandleError(c, err) {
		return
	}
	list, total, err := mdl.All(query)
	if util.HandleError(c, err) {
		return
	}
	util.JsonPagination(c, list, total, query)
}

//One
func userOne(c *gin.Context) {
	var mdl po.User
	err := c.ShouldBind(&mdl)
	mdl.Password = util.Md5(mdl.Password)
	if util.HandleError(c, err) {
		return
	}
	data, err := mdl.One()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, data)
}

//One
func userOneById(c *gin.Context) {
	var mdl po.User
	id, err := util.ParseParamID(c)
	if util.HandleError(c, err) {
		return
	}
	mdl.Id = id
	data, err := mdl.One()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, data)
}

//CreateUserOfRole
func userCreateUserOfRole(c *gin.Context) {
	var mdl po.User
	err := c.ShouldBind(&mdl)
	if util.HandleError(c, err) {
		return
	}
	mdl.Password = util.Md5(mdl.Password)
	err = mdl.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, mdl)
}

//Update
func userUpdate(c *gin.Context) {
	var mdl po.User
	err := c.ShouldBind(&mdl)
	if util.HandleError(c, err) {
		return
	}
	err = mdl.Update()
	if util.HandleError(c, err) {
		return
	}
	util.JsonSuccess(c)
}

//Delete
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
	util.JsonSuccess(c)
}
