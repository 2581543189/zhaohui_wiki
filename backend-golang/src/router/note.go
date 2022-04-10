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

func initNoteRoute(Router *gin.RouterGroup) {
	Router.Group("note").Use(middleware.Auth())
	{
		global.GroupApi.POST("note", noteAll)
		global.GroupApi.POST("note/add", noteAdd)
		global.GroupApi.POST("note/delete/:id", noteDelete)
		global.GroupApi.POST("note/update/:id", noteUpdate)
	}

}

// @Tags Note
// @Summary 查询文章
// @Produce  application/json
// @Param data body request.ArticleQueryRequest true "查询文章"
// @Success      200  {object}  response.Response
// @Router /api/v1/note [post]
func noteAll(c *gin.Context) {
	req := request.DefaultNoteQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter(req.Sorter)
	where := make(map[string]interface{})
	if len(req.Name) > 0 {
		// 查询书籍
		book, err := (&po.Book{Name: req.Name}).One()
		if err != nil || book == nil {
			response.FailWithMessage("未找到书籍："+req.Name, c)
			return
		}
		where["note.book = ?"] = book.Id
	}
	if req.Id > 0 {
		where["note.id = ?"] = req.Id
	}

	query := &util.PaginationQuery{
		Limit:  req.PageSize,
		Offset: req.PageSize * (req.CurrentPage - 1),
		Order:  order,
		Where:  where,
	}
	list, total, err := (&po.NoteWithBook{}).AllWithBook(query)
	list2 := make([]po.NoteWithBookVO, 0)
	if list != nil && len(*list) > 0 {
		list2 = make([]po.NoteWithBookVO, len(*list))
		for i, val := range *list {
			list2[i] = po.NewNoteWithBook(val)
		}
	}

	if util.HandleError(c, err) {
		return
	}
	data := response.PageResponse{total, list2}
	util.JsonData(c, data)
}

// @Tags Note
// @Summary 新增文章
// @Produce  application/json
// @Param data body request.ArticleAddOrUpdateRequest true "x新增文章"
// @Success      200  {object}  response.Response
// @Router /api/v1/note/add [post]
func noteAdd(c *gin.Context) {
	var req request.NoteAddOrUpdateRequest
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	if len(req.BookName) <= 0 {
		response.FailWithMessage("bookname 不能为空", c)
		return
	}
	// 查询书籍
	book, err := (&po.Book{Name: req.BookName}).One()
	if err != nil || book == nil {
		response.FailWithMessage("未找到书籍："+req.BookName, c)
		return
	}
	req.Book = int(book.Id)
	article := po.NewNote(req)
	err = article.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, article)
}

// @Tags Note
// @Summary 删除用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/note/delete/{id} [post]
func noteDelete(c *gin.Context) {
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

// @Tags Note
// @Summary 更新用户
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/node/update/{id} [post]
func noteUpdate(c *gin.Context) {
	var req request.NoteAddOrUpdateRequest
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
	note := po.Note{}
	note.Id = id
	inDb, err := note.One()
	if util.HandleError(c, err) {
		return
	}
	if inDb == nil {
		response.FailWithMessage("未找到note"+strconv.Itoa(int(req.Id)), c)
	}
	// 获取书籍
	book, err := (&po.Book{Name: req.BookName}).One()
	if err != nil || book == nil {
		response.FailWithMessage("未找到书籍："+req.BookName, c)
		return
	}
	note = po.NewNote(req)
	note.Book = int(book.Id)
	note.Update()
	util.JsonData(c, note)
}
