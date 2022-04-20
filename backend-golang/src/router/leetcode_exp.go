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
)

func initLeetcodeExpRoute(Router *gin.RouterGroup) {
	Router.Group("leetcode").Use(middleware.Auth())
	{
		global.GroupApi.POST("leetcodeexp", leetcodeExpAll)
		global.GroupApi.POST("leetcodeexp/add", leetcodeExpAdd)
		global.GroupApi.POST("leetcodeexp/delete/:id", leetcodeExpDelete)
	}

}

// @Tags LeetcodeExp
// @Summary 查询刷题心得
// @Produce  application/json
// @Param data body request.LeetcodeExpQueryRequest true "查询算法题目"
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcodeexp [post]
func leetcodeExpAll(c *gin.Context) {
	req := request.DefaultLeetcodeExpQueryRequest()
	if reflect.TypeOf(c.Request.Body) != reflect.TypeOf(http.NoBody) {
		err := c.ShouldBindBodyWith(&req, binding.JSON)
		if util.HandleError(c, err) {
			return
		}
	}
	order := util.ParseSorter("leetcode_experience", req.Sorter)
	where := make(map[string]interface{})
	if req.Id > 0 {
		where["leetcode_experience.id = ?"] = req.Id
	}
	if req.LeetcodeId > 0 {
		where["leetcode_experience.leetcode_id = ?"] = req.LeetcodeId
	}

	if len(req.Type) > 0 && len(req.First) > 0 && len(req.Second) > 0 && len(req.Third) > 0 {
		classifyKey := po.NewClassificationByKey(req.ClassificationKey)
		classify, err := classifyKey.One()
		if err != nil || classify == nil {
			response.FailWithMessage("未查询到类型"+util.JsonNoException(classifyKey), c)
			return
		}
		where["leetcode_experience.classification = ?"] = classify.Id
	}

	query := &util.PaginationQuery{
		Limit:  req.PageSize,
		Offset: req.PageSize * (req.CurrentPage - 1),
		Order:  order,
		Where:  where,
	}
	list, total, err := (&po.LeetcodeExperienceWithClassification{}).AllWithClassification(query)
	if util.HandleError(c, err) {
		return
	}
	list2 := make([]po.LeetcodeExperienceWithClassificationVO, 0)
	if list != nil && len(*list) > 0 {
		list2 = make([]po.LeetcodeExperienceWithClassificationVO, len(*list))
		for i, val := range *list {
			list2[i] = po.NewLeetcodeExperienceWithClassification(val)
		}
	}
	data := response.PageResponse{total, list2}
	util.JsonData(c, data)
}

// @Tags LeetcodeExp
// @Summary 新增刷题心得
// @Produce  application/json
// @Param data body request.LeetcodeExpInfoAddOrUpdateRequest true "新增刷题心得"
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcodeexp/add [post]
func leetcodeExpAdd(c *gin.Context) {
	var req request.LeetcodeExpInfoAddOrUpdateRequest
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
	leetcodeExp := po.NewLeetcodeExperience(req)
	err = leetcodeExp.CreateUserOfRole()
	if util.HandleError(c, err) {
		return
	}
	service.AddEvent(leetcodeExp)
	util.JsonData(c, leetcodeExp)
}

// @Tags LeetcodeExp
// @Summary 删除算法题目
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/leetcodeexp/delete/{id} [post]
func leetcodeExpDelete(c *gin.Context) {
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
	service.DeleteEvent(mdl)
	util.JsonData(c, mdl)
}
