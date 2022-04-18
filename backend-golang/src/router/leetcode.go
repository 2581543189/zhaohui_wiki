package router

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/po"
	"backend-golang/src/model/request"
	"backend-golang/src/model/response"
	"backend-golang/src/service"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
	"reflect"
	"strconv"
)

func initLeetcodeRoute(Router *gin.RouterGroup) {
	Router.Group("leetcode").Use(middleware.Auth())
	{
		global.GroupApi.POST("leetcode", leetcodeAll)
		global.GroupApi.POST("leetcode/add", leetcodeAdd)
		global.GroupApi.POST("leetcode/delete/:id", leetcodeDelete)
		global.GroupApi.POST("leetcode/update/:id", leetcodeUpdate)
	}

}

// @Tags Leetcode
// @Summary 查询算法题目
// @Produce  application/json
// @Param data body request.LeetcodeQueryRequest true "查询算法题目"
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcode [post]
func leetcodeAll(c *gin.Context) {
	req := request.DefaultLeetcodeQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter("leetcode", req.Sorter)
	where := make(map[string]interface{})
	if len(req.Name) > 0 {
		where["name like ?"] = "%" + req.Name + "%"
	}
	if req.Id > 0 {
		where["leetcode.id = ?"] = req.Id
	}
	if len(req.Difficulty) > 0 {
		where["difficulty = ?"] = req.Difficulty
	}
	if len(req.Status) > 0 {
		where["status = ?"] = req.Status
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
	list, total, err := (&po.LeetcodeWithClassification{}).AllWithClassification(query)
	if util.HandleError(c, err) {
		return
	}
	list2 := make([]po.LeetcodeWithClassificationVO, 0)
	if list != nil && len(*list) > 0 {
		list2 = make([]po.LeetcodeWithClassificationVO, len(*list))
		for i, val := range *list {
			list2[i] = po.NewLeetcodeWithClassification(val)
		}
	}
	data := response.PageResponse{total, list2}
	util.JsonData(c, data)
}

// @Tags Leetcode
// @Summary 新增算法题目
// @Produce  application/json
// @Param data body request.LeetcodeAddOrUpdateRequest true "新增算法题目"
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcode/add [post]
func leetcodeAdd(c *gin.Context) {
	var req request.LeetcodeAddOrUpdateRequest
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
	leetcode := po.NewLeetcode(req)
	err = leetcode.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	service.AddEvent(leetcode)
	util.JsonData(c, leetcode)
}

// @Tags Leetcode
// @Summary 删除算法题目
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcode/delete/{id} [post]
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
	service.DeleteEvent(mdl)
	util.JsonData(c, mdl)
}

// @Tags Leetcode
// @Summary 更新算法题目
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcode/update/{id} [post]
func leetcodeUpdate(c *gin.Context) {
	var req request.LeetcodeAddOrUpdateRequest
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
	leetcode := po.Leetcode{}
	leetcode.Id = id
	inDb, err := leetcode.One()
	if util.HandleError(c, err) {
		return
	}
	if inDb == nil {
		response.FailWithMessage("未找书籍"+strconv.Itoa(int(req.Id)), c)
	}
	// 获取 classfication
	classifyKey := po.NewClassificationByKey(req.ClassificationKey)
	classify, err := classifyKey.One()
	if err != nil || classify == nil {
		response.FailWithMessage("未查询到类型"+util.JsonNoException(classifyKey), c)
	}
	leetcode = po.NewLeetcode(req)
	leetcode.Classification = int(classify.Id)
	leetcode.Update()
	util.JsonData(c, leetcode)
}
