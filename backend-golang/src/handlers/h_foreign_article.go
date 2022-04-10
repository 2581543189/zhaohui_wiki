package handlers

import (
	"backend-golang/src/model/po"
	util "backend-golang/src/util"
	"github.com/gin-gonic/gin"
)

func init() {
	//global.GroupApi.GET("foreign-article", foreignArticleAll)
	//global.GroupApi.GET("foreign-article/:id", foreignArticleOne)
	//global.GroupApi.POST("foreign-article", foreignArticleCreateUserOfRole)
	//global.GroupApi.PATCH("foreign-article", foreignArticleUpdate)
	//global.GroupApi.DELETE("foreign-article/:id", foreignArticleDelete)
}

//All
func foreignArticleAll(c *gin.Context) {
	mdl := po.ForeignArticle{}
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
func foreignArticleOne(c *gin.Context) {
	var mdl po.ForeignArticle
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
func foreignArticleCreateUserOfRole(c *gin.Context) {
	var mdl po.ForeignArticle
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
func foreignArticleUpdate(c *gin.Context) {
	var mdl po.ForeignArticle
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
func foreignArticleDelete(c *gin.Context) {
	var mdl po.ForeignArticle
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
