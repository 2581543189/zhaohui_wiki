package handlers

import (
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("leetcode", leetcodeAll)
	//global.GroupApi.GET("leetcode/:id", leetcodeOne)
	//global.GroupApi.POST("leetcode", leetcodeCreateUserOfRole)
	//global.GroupApi.PATCH("leetcode", leetcodeUpdate)
	//global.GroupApi.DELETE("leetcode/:id", leetcodeDelete)
}

//All
func leetcodeAll(c *gin.Context) {
	mdl := po.Leetcode{}
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
func leetcodeOne(c *gin.Context) {
	var mdl po.Leetcode
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
func leetcodeCreateUserOfRole(c *gin.Context) {
	var mdl po.Leetcode
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
func leetcodeUpdate(c *gin.Context) {
	var mdl po.Leetcode
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
func leetcodeDelete(c *gin.Context) {
	var mdl po.Leetcode
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
