package handlers

import (
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("leetcode-experience", leetcodeExperienceAll)
	//global.GroupApi.GET("leetcode-experience/:id", leetcodeExperienceOne)
	//global.GroupApi.POST("leetcode-experience", leetcodeExperienceCreateUserOfRole)
	//global.GroupApi.PATCH("leetcode-experience", leetcodeExperienceUpdate)
	//global.GroupApi.DELETE("leetcode-experience/:id", leetcodeExperienceDelete)
}

//All
func leetcodeExperienceAll(c *gin.Context) {
	mdl := po.LeetcodeExperience{}
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
func leetcodeExperienceOne(c *gin.Context) {
	var mdl po.LeetcodeExperience
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
func leetcodeExperienceCreateUserOfRole(c *gin.Context) {
	var mdl po.LeetcodeExperience
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
func leetcodeExperienceUpdate(c *gin.Context) {
	var mdl po.LeetcodeExperience
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
func leetcodeExperienceDelete(c *gin.Context) {
	var mdl po.LeetcodeExperience
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
