package router

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"github.com/gin-gonic/gin"
	"math/rand"
	"time"
)

func initMettoRoute(Router *gin.RouterGroup) {
	Router.Group("metto").Use(middleware.Auth())
	{
		global.GroupApi.POST("metto/random", mettoRandom)
	}

}

// @Tags Metto
// @Summary 查询箴言
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/metto/random [post]
func mettoRandom(c *gin.Context) {

	ans := []string{}
	query := &util.PaginationQuery{}
	list, _, err := (&po.Motto{}).All(query)
	if err != nil || list == nil || len(*list) <= 0 {

		util.JsonData(c, "欲买桂花同载酒，终不似，少年游")
	}
	for i := range *list {
		ans = append(ans, (*list)[i].Content)
	}
	util.JsonData(c, randomOne(ans))
}

// 随机获取一个
func randomOne(list []string) string {
	rand.Seed(time.Now().Unix())
	i := rand.Intn(len(list) - 1)
	return list[i]
}
