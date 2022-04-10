package global

import (
	"backend-golang/src/model/overview"
)

var GOLBAL_ACHIEVEMENT = []overview.Achievement{}

func init() {
	ach1 := overview.Achievement{
		Level: 2,
		Icon:  "home",
		Desc: overview.AchievementDesc{
			Now:     "成功搭建网站[2018-11-09]",
			Next:    "网站2.0？",
			Current: 0,
			Total:   1,
			Hanzi:   "始",
		},
	}
	GOLBAL_ACHIEVEMENT = append(GOLBAL_ACHIEVEMENT, ach1)
	ach2 := overview.Achievement{
		Level: 4,
		Icon:  "play-circle-o",
		Desc: overview.AchievementDesc{
			Now:     "使用golang重构后端逻辑[2022-04-10]",
			Next:    "再学一门新语言？",
			Current: 0,
			Total:   1,
			Hanzi:   "Go",
		},
	}
	GOLBAL_ACHIEVEMENT = append(GOLBAL_ACHIEVEMENT, ach2)
}
