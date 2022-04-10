package handlers

import (
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("note", noteAll)
	//global.GroupApi.GET("note/:id", noteOne)
	//global.GroupApi.POST("note", noteCreateUserOfRole)
	//global.GroupApi.PATCH("note", noteUpdate)
	//global.GroupApi.DELETE("note/:id", noteDelete)
}

//All
func noteAll(c *gin.Context) {
	mdl := po.Note{}
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
func noteOne(c *gin.Context) {
	var mdl po.Note
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
func noteCreateUserOfRole(c *gin.Context) {
	var mdl po.Note
	err := c.ShouldBind(&mdl)
	if util.HandleError(c, err) {
		return
	}
	err = mdl.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, mdl)
}

//Update
func noteUpdate(c *gin.Context) {
	var mdl po.Note
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
func noteDelete(c *gin.Context) {
	var mdl po.Note
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
