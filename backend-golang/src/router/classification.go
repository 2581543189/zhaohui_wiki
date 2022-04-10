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

func initClassificationRoute(Router *gin.RouterGroup) {
	Router.Group("classification").Use(middleware.Auth())
	{
		global.GroupApi.POST("classification", classificationAll)
		global.GroupApi.POST("classification/add", classificationAdd)
		global.GroupApi.POST("classification/delete/:id", classificationDelete)
		global.GroupApi.POST("classification/update/:id", classificationUpdate)
		global.GroupApi.POST("classification/distinct", classificationDistinct)
	}

}

// @Tags Classification
// @Summary 查询类别
// @Produce  application/json
// @Param data body request.ClassificationQueryRequest true "查询类别"
// @Success      200  {object}  response.Response
// @Router /api/v1/classification [post]
func classificationAll(c *gin.Context) {
	req := request.DefaultClassificationQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter("classification", req.Sorter)
	where := make(map[string]interface{})
	if req.Id > 0 {
		where["Id = ?"] = req.Id
	}
	if len(req.Type) > 0 {
		where["type = ?"] = req.Type
	}
	if len(req.First) > 0 {
		where["first = ?"] = req.First
	}
	if len(req.Second) > 0 {
		where["second = ?"] = req.Second
	}
	if len(req.Third) > 0 {
		where["third = ?"] = req.Third
	}

	query := &util.PaginationQuery{
		Limit:  req.PageSize,
		Offset: req.PageSize * (req.CurrentPage - 1),
		Order:  order,
		Where:  where,
	}
	list, total, err := (&po.Classification{}).All(query)
	if util.HandleError(c, err) {
		return
	}
	data := response.PageResponse{total, list}
	util.JsonData(c, data)
}

// @Tags Classification
// @Summary 新增类别
// @Produce  application/json
// @Param data body request.ClassificationKey true "新增类别"
// @Success      200  {object}  response.Response
// @Router /api/v1/classification/add [post]
func classificationAdd(c *gin.Context) {
	var req request.ClassificationKey
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}

	classification := po.NewClassification(req)
	//classification.Type = global.CLASSIFICATION_TYPE[global.SKILL]
	err := classification.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	util.JsonData(c, classification)
}

// @Tags Classification
// @Summary 删除类别
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/classification/delete/{id} [post]
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
	util.JsonData(c, mdl)
}

// @Tags Classification
// @Summary 更新类别
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/classification/update/{id} [post]
func classificationUpdate(c *gin.Context) {
	var req request.ClassificationKey
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
	classification := po.Classification{}
	classification.Id = id
	inDb, err := classification.One()
	if util.HandleError(c, err) {
		return
	}
	if inDb == nil {
		response.FailWithMessage("未找到用户"+strconv.Itoa(int(req.ClassificationId)), c)
	}
	classification = po.NewClassification(req)
	classification.Update()
	util.JsonData(c, classification)
}

// @Tags Classification
// @Summary 查询条件distinct
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/classification/distinct [post]
func classificationDistinct(c *gin.Context) {
	var req request.ClassificationDistinctRequest
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	if len(req.Name) == 0 {
		req.Name = "first"
	}
	sqlStr := "SELECT DISTINCT " + req.Name + " FROM classification WHERE type = '"
	sqlStr += req.Type
	sqlStr += "' "
	if len(req.First) > 0 {
		sqlStr += "and first = '" + req.First + "'"
	}
	if len(req.Second) > 0 {
		sqlStr += "and second = '" + req.Second + "'"
	}
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
