package request

type MessageQueryRequest struct {
	Offset int  `json:"offset"`
	Limit  uint `json:"limit"`
}

func DefaultMessageQueryRequest() MessageQueryRequest {
	return MessageQueryRequest{Offset: 0, Limit: 10}
}

type MessageAddOrUpdateRequest struct {
	Id      uint   `json:"id"`
	Name    string `json:"name"`
	Avatar  string `json:"avatar"`
	Content string `json:"content"`
}
