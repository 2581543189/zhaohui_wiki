package overview

type ActivityOrigin struct {
	Name           string `json:"name"`
	Book           int    `json:"book"`
	Note           int    `json:"note"`
	Article        int    `json:"article"`
	LeetCode       int    `json:"leetcode"`
	ForeignArticle int    `json:"foreignArticle"`
}

type Activity struct {
	Name  string `json:"name"`
	Label string `json:"label"`
	Value int    `json:"value"`
}

func NewActivity(name, label string, value int) Activity {
	return Activity{
		Name:  name,
		Label: label,
		Value: value,
	}
}
