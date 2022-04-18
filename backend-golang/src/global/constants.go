package global

type ClassType int

const (
	SKILL ClassType = iota
)

var (
	CLASSIFICATION_TYPE = []string{"SKILL"}
	DIFFICULTIES        = []string{"", "简单", "中等", "困难"}
)
