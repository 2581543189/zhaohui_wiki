package overview

type Interest struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
	Type  int    `json:"type"`
}

func NewInterest(name string, typee, value int) Interest {
	return Interest{
		Name:  name,
		Value: value,
		Type:  typee,
	}
}
