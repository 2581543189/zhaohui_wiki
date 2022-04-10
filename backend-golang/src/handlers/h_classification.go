package handlers

import (
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("classification", classificationAll)
	//global.GroupApi.GET("classification/:id", classificationOne)
	//global.GroupApi.POST("classification", classificationCreateUserOfRole)
	//global.GroupApi.PATCH("classification", classificationUpdate)
	//global.GroupApi.DELETE("classification/:id", classificationDelete)
}

//All
func classificationAll(c *gin.Context) {
	mdl := po.Classification{}
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
func classificationOne(c *gin.Context) {
	var mdl po.Classification
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
func classificationCreateUserOfRole(c *gin.Context) {
	var mdl po.Classification
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
func classificationUpdate(c *gin.Context) {
	var mdl po.Classification
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
func classificationDelete(c *gin.Context) {
	var mdl po.Classification
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
