package router

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/po"
	"backend-golang/src/model/request"
	"backend-golang/src/model/response"
	"backend-golang/src/util"
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"reflect"
	"strconv"
)

func initArticleRoute(Router *gin.RouterGroup) {
	Router.Group("article").Use(middleware.Auth())
	{
		global.GroupApi.POST("article", articleAll)
		global.GroupApi.POST("article/add", articleAdd)
		global.GroupApi.POST("article/delete/:id", articleDelete)
		global.GroupApi.POST("article/update/:id", articleUpdate)
		global.GroupApi.POST("article/distinctPlatform", articleDistinctPlatform)
	}

}

// @Tags Article
// @Summary 查询文章
// @Produce  application/json
// @Param data body request.ArticleQueryRequest true "查询文章"
// @Success      200  {object}  response.Response
// @Router /api/v1/article [post]
func articleAll(c *gin.Context) {
	req := request.DefaultArticleQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter(req.Sorter)
	where := make(map[string]interface{})
	if len(req.Title) > 0 {
		where["title like ?"] = "%" + req.Title + "%"
	}
	if req.Id > 0 {
		where["article.id = ?"] = req.Id
	}
	if len(req.Platform) > 0 {
		where["platform = ?"] = req.Platform
	}
	if len(req.Type) > 0 && len(req.First) > 0 && len(req.Second) > 0 && len(req.Third) > 0 {
		classifyKey := po.NewClassificationByKey(req.ClassificationKey)
		classify, err := classifyKey.One()
		if err != nil || classify == nil {
			response.FailWithMessage("未查询到类型"+util.JsonNoException(classifyKey), c)
			return
		}
		where["classification = ?"] = classify.Id
	}

	query := &util.PaginationQuery{
		Limit:  req.PageSize,
		Offset: req.PageSize * (req.CurrentPage - 1),
		Order:  order,
		Where:  where,
	}
	list, total, err := (&po.ArticleWithClassification{}).AllWithClassification(query)
	list2 := make([]po.ArticleWithClassificationVO, 0)
	if list != nil && len(*list) > 0 {
		list2 = make([]po.ArticleWithClassificationVO, len(*list))
		for i, val := range *list {
			list2[i] = po.NewArticleWithClassification(val)
		}
	}

	if util.HandleError(c, err) {
		return
	}
	data := response.PageResponse{total, list2}
	util.JsonData(c, data)
}

// @Tags Article
// @Summary 新增文章
// @Produce  application/json
// @Param data body request.ArticleAddOrUpdateRequest true "x新增文章"
// @Success      200  {object}  response.Response
// @Router /api/v1/article/add [post]
func articleAdd(c *gin.Context) {
	var req request.ArticleAddOrUpdateRequest
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	// 获取 classfication
	classifyKey := po.NewClassificationByKey(req.ClassificationKey)
	classify, err := classifyKey.One()
	if err != nil || classify == nil {
		response.FailWithMessage("未查询到类型"+util.JsonNoException(classifyKey), c)
	}
	req.Classification = int(classify.Id)
	article := po.NewArticle(req)
	err = article.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, article)
}

// @Tags Article
// @Summary 删除用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/article/delete/{id} [post]
func articleDelete(c *gin.Context) {
	var mdl po.Article
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

// @Tags Article
// @Summary 更新用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/article/update/{id} [post]
func articleUpdate(c *gin.Context) {
	var req request.ArticleAddOrUpdateRequest
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
	req.Id = id
	article := po.Article{}
	article.Id = id
	inDb, err := article.One()
	if util.HandleError(c, err) {
		return
	}
	if inDb == nil {
		response.FailWithMessage("未找到用户"+strconv.Itoa(int(req.Id)), c)
	}
	// 获取 classfication
	classifyKey := po.NewClassificationByKey(req.ClassificationKey)
	classify, err := classifyKey.One()
	if err != nil || classify == nil {
		response.FailWithMessage("未查询到类型"+util.JsonNoException(classifyKey), c)
	}
	article = po.NewArticle(req)
	article.Classification = int(classify.Id)
	article.Update()
	util.JsonData(c, article)
}

// @Tags Article
// @Summary 查询平台列表
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/article/distinctPlatform [post]
func articleDistinctPlatform(c *gin.Context) {
	sqlStr := "SELECT DISTINCT platform FROM article"
	rows, err := global.Db.Query(sqlStr)
	if util.HandleError(c, err) {
		return
	}
	ans := []string{}
	for rows.Next() {
		var val sql.NullString
		err = rows.Scan(&val)
		if err != nil {
			global.Logger.Error(err)
			continue
		}
		ans = append(ans, val.String)
	}
	util.JsonData(c, ans)
}
