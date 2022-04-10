package overview

import "strconv"

type Achievement struct {
	Level int             `json:"level"`
	Icon  string          `json:"icon"`
	Desc  AchievementDesc `json:"desc"`
}

type AchievementDesc struct {
	Now     string `json:"now"`
	Next    string `json:"next"`
	Current int    `json:"current"`
	Total   int    `json:"total"`
	Hanzi   string `json:"hanzi"`
}

func NewAchievement(count int, icon, start, end string) Achievement {
	var level = 0
	var hanzi = "壹"
	var total = 1
	var now = 0
	if count <= 0 {
		level = 0
		hanzi = "〇"
		total = 1
		now = 0
	} else if count < 10 {
		level = 0
		hanzi = "壹"
		total = 10
		now = 1
	} else if count < 50 {
		level = 1
		hanzi = "十"
		total = 50
		now = 10
	} else if count < 100 {
		level = 2
		hanzi = "卌"
		total = 100
		now = 50
	} else if count < 200 {
		level = 3
		hanzi = "百"
		total = 200
		now = 100
	} else {
		level = 4
		hanzi = "皕"
		total = 1000
		now = 200
	}

	return Achievement{
		Level: level,
		Icon:  icon,
		Desc: AchievementDesc{
			Now:     start + strconv.Itoa(now) + end,
			Next:    start + strconv.Itoa(total) + end,
			Current: now,
			Total:   total,
			Hanzi:   hanzi,
		},
	}
}
