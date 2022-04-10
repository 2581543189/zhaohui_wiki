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
)

func initBookRoute(Router *gin.RouterGroup) {
	Router.Group("book").Use(middleware.Auth())
	{
		global.GroupApi.POST("book", bookAll)
		global.GroupApi.POST("book/add", bookAdd)
		global.GroupApi.POST("book/delete/:id", bookDelete)
		global.GroupApi.POST("book/update/:id", bookUpdate)
	}

}

// @Tags Book
// @Summary 查询书籍
// @Produce  application/json
// @Param data body request.BookQueryRequest true "查询书籍"
// @Success      200  {object}  response.Response
// @Router /api/v1/book [post]
func bookAll(c *gin.Context) {
	req := request.DefaultBookQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter(req.Sorter)
	where := make(map[string]interface{})
	if len(req.Name) > 0 {
		where["name like ?"] = "%" + req.Name + "%"
	}
	if req.Id > 0 {
		where["book.id = ?"] = req.Id
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
	list, total, err := (&po.BookWithClassification{}).AllWithClassification(query)
	list2 := make([]po.BookWithClassificationVO, 0)
	if list != nil && len(*list) > 0 {
		list2 = make([]po.BookWithClassificationVO, len(*list))
		for i, val := range *list {
			list2[i] = po.NewBookWithClassification(val)
		}
	}

	if util.HandleError(c, err) {
		return
	}
	data := response.PageResponse{total, list2}
	util.JsonData(c, data)
}

// @Tags Book
// @Summary 新增书籍
// @Produce  application/json
// @Param data body request.ArticleAddOrUpdateRequest true "新增书籍"
// @Success      200  {object}  response.Response
// @Router /api/v1/book/add [post]
func bookAdd(c *gin.Context) {
	var req request.BookAddOrUpdateRequest
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
	article := po.NewBook(req)
	err = article.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, article)
}

// @Tags Book
// @Summary 删除用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/book/delete/{id} [post]
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
	util.JsonData(c, mdl)
}

// @Tags Book
// @Summary 更新用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/book/update/{id} [post]
func bookUpdate(c *gin.Context) {
	var req request.BookAddOrUpdateRequest
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
	req.BookId = id
	article := po.Book{}
	article.Id = id
	inDb, err := article.One()
	if util.HandleError(c, err) {
		return
	}
	if inDb == nil {
		response.FailWithMessage("未找书籍"+strconv.Itoa(int(req.BookId)), c)
	}
	// 获取 classfication
	classifyKey := po.NewClassificationByKey(req.ClassificationKey)
	classify, err := classifyKey.One()
	if err != nil || classify == nil {
		response.FailWithMessage("未查询到类型"+util.JsonNoException(classifyKey), c)
	}
	article = po.NewBook(req)
	article.Classification = int(classify.Id)
	article.Update()
	util.JsonData(c, article)
}
