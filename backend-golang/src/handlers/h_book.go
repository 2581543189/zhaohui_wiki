package handlers

import (
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("book", bookAll)
	//global.GroupApi.GET("book/:id", bookOne)
	//global.GroupApi.POST("book", bookCreateUserOfRole)
	//global.GroupApi.PATCH("book", bookUpdate)
	//global.GroupApi.DELETE("book/:id", bookDelete)
}

//All
func bookAll(c *gin.Context) {
	mdl := po.Book{}
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
func bookOne(c *gin.Context) {
	var mdl po.Book
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
func bookCreateUserOfRole(c *gin.Context) {
	var mdl po.Book
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
func bookUpdate(c *gin.Context) {
	var mdl po.Book
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
func bookDelete(c *gin.Context) {
	var mdl po.Book
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
