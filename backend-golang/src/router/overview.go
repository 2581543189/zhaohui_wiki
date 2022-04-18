package router

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/overview"
	"backend-golang/src/model/po"
	"backend-golang/src/util"
	"database/sql"
	"github.com/gin-gonic/gin"
	"math/rand"
	"reflect"
	"sort"
	"strconv"
	"sync"
)

func initOverViewRoute(Router *gin.RouterGroup) {
	Router.Group("overview").Use(middleware.Auth())
	{
		global.GroupApi.POST("overview/achievement", getAchievement)
		global.GroupApi.POST("overview/task", getTask)
		global.GroupApi.POST("overview/interest", getInterest)
		global.GroupApi.POST("overview/activity", getActivity)
		global.GroupApi.POST("overview/foreign_word", getForeignWord)
	}

}

// @Tags Overview
// @Summary 查询成就
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/overview/achievement [post]
func getAchievement(c *gin.Context) {
	ans := make([]overview.Achievement, 0)
	ans = append(ans, global.GOLBAL_ACHIEVEMENT...)
	// 文章
	article := getCount("select count(id) from article")
	ans = append(ans, overview.NewAchievement(article, "highlight", "累积发表", "篇文章"))
	// 书籍
	book := getCount("select count(id) from book where gmt_end is not null")
	ans = append(ans, overview.NewAchievement(book, "book", "累积阅读完成", "本书"))
	// 笔记
	note := getCount("select count(id) from note")
	ans = append(ans, overview.NewAchievement(note, "tags", "累计记录", "篇读书笔记"))

	// 算法题
	leetcode := getCount("select count(id) from leetcode")
	ans = append(ans, overview.NewAchievement(leetcode, "calculator", "累计整理", "道算法题"))

	// 生词
	foreignWord := getCount("select count(id) from foreign_word")
	ans = append(ans, overview.NewAchievement(foreignWord/20, "file-text", "累计记录", " * 20 个生词"))

	// 收藏
	bookmark := getCount("select count(id) from bookmark")
	ans = append(ans, overview.NewAchievement(bookmark, "star-o", "累计收藏", "个网页"))

	// 按照 level 排序
	sort.Slice(ans, func(i, j int) bool {
		if ans[i].Level == ans[j].Level {
			return ans[i].Desc.Current > ans[j].Desc.Current
		}
		return ans[i].Level > ans[j].Level
	})
	util.JsonData(c, ans)
}

// 执行sql，获取数量
func getCount(sqlStr string) int {
	rows, err := global.Db.Query(sqlStr)
	if err != nil {
		return 0
	}
	defer rows.Close()
	for rows.Next() {
		var val sql.NullInt32
		err = rows.Scan(&val)
		if err != nil {
			return 0
		}
		return int(val.Int32)
	}
	return 0
}

// @Tags Overview
// @Summary 查询任务
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/overview/task [post]
func getTask(c *gin.Context) {
	ans := make([]overview.Task, 0)
	wg := sync.WaitGroup{}
	wg.Add(6)
	go func() {
		defer wg.Done()
		ans = append(ans, keywordTask())
	}()
	go func() {
		defer wg.Done()
		ans = append(ans, bookmarkTask())
	}()
	go func() {
		defer wg.Done()
		ans = append(ans, foreignWordTask())
	}()
	go func() {
		defer wg.Done()
		ans = append(ans, leetcodeTask())
	}()
	go func() {
		defer wg.Done()
		ans = append(ans, articleTask())
	}()
	go func() {
		defer wg.Done()
		ans = append(ans, bookTask())
	}()

	wg.Wait()
	util.JsonData(c, ans)
}

// 总结相关任务
func keywordTask() overview.Task {
	var ans overview.Task
	// 这周一个热词都没有收集，小心变成井底之蛙！or 任务已经完成
	keyword := getCount("select count(id) from keyword where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(\"gmt_create\")")
	if keyword == 0 {
		ans = overview.NewTask(0, "新视野", "这周一个热词都没有收集，小心变成井底之蛙！")
	} else {
		ans = overview.NewTask(0, "新视野", "任务已经完成!")
	}
	return ans
}

// 总结相关任务
func bookmarkTask() overview.Task {
	var ans overview.Task
	// 这周一个网页都没收集，快去学习！ or 任务已经完成
	bookmark := getCount("select count(id) from bookmark where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(\"gmt_create\")")
	if bookmark == 0 {
		ans = overview.NewTask(0, "收藏夹养成计划", "这周没新增，是不是又看新闻刷视频了？快去学习！")
	} else {
		ans = overview.NewTask(0, "收藏夹养成计划", "任务已经完成!")
	}
	return ans
}

// 总结相关任务
func foreignWordTask() overview.Task {
	var ans overview.Task
	// 这周一个生词都没有总计，快去阅读！or 任务已经完成
	foreignWord := getCount("select count(id) from foreign_word where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(\"gmt_create\")")
	if foreignWord == 0 {
		ans = overview.NewTask(0, "英文阅读", "这周一个生词都没有增加,快去阅读!")
	} else {
		ans = overview.NewTask(0, "英文阅读", "任务已经完成!")
	}
	return ans
}

// 算法相关任务
func leetcodeTask() overview.Task {
	var ans overview.Task
	// 「」等 xxx 道算法题等待你去复习 or 任务已经完成
	leetcode := getCount("select count(id) from leetcode where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(\"gmt_modified\")")
	if leetcode == 0 {
		leetcodeDb := po.Leetcode{}
		query := &util.PaginationQuery{}
		list, _, err := (&leetcodeDb).All(query)
		if err != nil || list == nil || len(*list) == 0 {
			ans = overview.NewTask(2, "算法刷题", strconv.Itoa(leetcode)+"道题目还可以再复习一下，加油！")
		} else {
			rand := randomBySize(len(*list))
			randomLeetCode := (*list)[rand]
			desc := "「" + randomLeetCode.Name + "」等" + strconv.Itoa(leetcode) + "道题目还可以再复习一下，加油！"
			ans = overview.NewTask(2, "算法刷题", desc)
		}
	} else {
		ans = overview.NewTask(2, "算法刷题", "任务已经完成!")
	}
	return ans
}

// 总结相关任务
func articleTask() overview.Task {
	var ans overview.Task
	// 这周什么都没有总结,抓紧时间 or 任务已经完成
	article := getCount("select count(id) from article where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(\"gmt_create\")")
	if article == 0 {
		ans = overview.NewTask(1, "发表文章", "这周什么都没有总结,抓紧时间!")
	} else {
		ans = overview.NewTask(1, "发表文章", "任务已经完成!")
	}
	return ans
}

// 书籍相关任务
func bookTask() overview.Task {
	var ans overview.Task
	// 书单都读完了，需要丰富一下了 or '《'+book.name+'》等'+count+'本书还没读完，加把劲吧！'
	book := getCount("select count(id) from book where gmt_end is null")
	if book == 0 {
		ans = overview.NewTask(0, "阅读书籍", "书单都读完了，需要丰富一下了~")
	} else {
		where := make(map[string]interface{})
		where["gmt_end is null and '1' = ?"] = "1"
		query := &util.PaginationQuery{
			Where: where,
		}
		bookDb := po.Book{}
		list, _, err := (&bookDb).All(query)
		if err != nil || list == nil || len(*list) == 0 {
			ans = overview.NewTask(0, "阅读书籍", strconv.Itoa(book)+"本书还没读完，加把劲吧！")
		} else {
			rand := randomBySize(len(*list))
			randomBook := (*list)[rand]
			desc := "《" + randomBook.Name + "》等" + strconv.Itoa(book) + "本书还没读完，加把劲吧！"
			ans = overview.NewTask(0, "阅读书籍", desc)
		}
	}
	return ans
}

// 随机获取一个
func randomBySize(size int) int {
	if size <= 1 {
		return 0
	}
	//rand.Seed(time.Now().Unix())
	i := rand.Intn(size - 1)
	return i
}

// @Tags Overview
// @Summary 随机关键字
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/overview/interest [post]
func getInterest(c *gin.Context) {
	ans := make([]overview.Interest, 0)
	for i := range global.GLOBAL_INTEREST {
		rand := randomBySize(100)
		ans = append(ans, overview.NewInterest(global.GLOBAL_INTEREST[i], rand%3, rand))
	}
	util.JsonData(c, ans)
}

// @Tags Overview
// @Summary 随机单词
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/overview/foreign_world [post]
func getForeignWord(c *gin.Context) {
	ans := make([]overview.Interest, 0)
	query := &util.PaginationQuery{
		Offset: 0,
		Limit:  100,
	}
	list, _, err := (&po.ForeignWord{}).All(query)
	if err != nil || list == nil || len(*list) == 0 {
		util.JsonData(c, ans)
		return
	} else {
		for i := range *list {
			rand := randomBySize(100)
			ans = append(ans, overview.NewInterest(((*list)[i]).Word, rand%3, rand))
		}
	}
	util.JsonData(c, ans)
}

// @Tags Overview
// @Summary 查询活跃度
// @Produce  application/json
// @Success      200  {object}  response.Response
// @Router /api/v1/overview/activity [post]
func getActivity(c *gin.Context) {
	//总书籍
	totalBooks := getCount("select count(id) from book")
	//完成书籍
	finishedBooks := getCount("select count(id) from book where gmt_end is not null")
	//笔记
	note := getCount("select count(id) from note")
	//文章
	article := getCount("select count(id) from article")
	//算法
	leetcode := getCount("select count(id) from leetcode")
	finishedLeetcode := getCount("select count(id) from leetcode where frequency > 1")
	//英文
	foreignArticle := getCount("select count(id) from foreign_article")

	origin := make([]overview.ActivityOrigin, 0)
	origin = append(origin, overview.ActivityOrigin{
		Name:           "汇总",
		Book:           totalBooks,
		Note:           note,
		Article:        article,
		LeetCode:       leetcode,
		ForeignArticle: foreignArticle,
	})
	origin = append(origin, overview.ActivityOrigin{
		Name:           "已完成",
		Book:           finishedBooks,
		Note:           note,
		Article:        article,
		LeetCode:       finishedLeetcode,
		ForeignArticle: foreignArticle,
	})
	origin = append(origin, overview.ActivityOrigin{
		Name:           "进行中",
		Book:           totalBooks - finishedBooks,
		Note:           0,
		Article:        0,
		LeetCode:       leetcode - finishedLeetcode,
		ForeignArticle: 0,
	})
	names := make(map[string]string)
	names["Book"] = "阅读"
	names["Note"] = "笔记"
	names["Article"] = "总结"
	names["LeetCode"] = "算法"
	names["ForeignArticle"] = "英文"
	ans := make([]overview.Activity, 0)
	for i := range origin {
		s := reflect.ValueOf(&origin[i]).Elem()
		typeOfT := s.Type()
		for j := 0; j < s.NumField(); j++ {
			f := s.Field(j)
			name := typeOfT.Field(j).Name
			if name == "Name" {
				continue
			}
			val := f.Interface().(int)
			label, _ := names[name]
			ans = append(ans, overview.NewActivity(origin[i].Name, label, val))
		}
	}
	util.JsonData(c, ans)
}
