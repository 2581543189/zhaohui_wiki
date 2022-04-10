package overview

type Task struct {
	Level int    `json:"level"`
	Title string `json:"title"`
	Desc  string `json:"desc"`
}

func NewTask(Level int, Title string, Desc string) Task {
	return Task{
		Level: Level,
		Title: Title,
		Desc:  Desc,
	}
}
