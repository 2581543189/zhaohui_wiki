package request

type BookQueryRequest struct {
	Id          uint   `json:"id"`
	Name        string `json:"name"`
	CurrentPage uint   `json:"currentPage"`
	PageSize    uint   `json:"pageSize"`
	Sorter      string `json:"sorter"`
	ClassificationKey
}

func DefaultBookQueryRequest() BookQueryRequest {
	return BookQueryRequest{CurrentPage: 1, PageSize: 10}
}

type BookInfo struct {
	BookId         uint   `json:"id"`
	GmtCreate      string `json:"gmt_create"`
	GmtEnd         string `json:"gmt_end"`
	Name           string `json:"name"`
	Author         string `json:"author"`
	Count          string `json:"count"`
	Current        string `json:"current"`
	Score          string `json:"score"`
	Img            string `json:"img"`
	Classification int    `json:"classification"`
}

type BookAddOrUpdateRequest struct {
	BookInfo
	ClassificationKey
}
