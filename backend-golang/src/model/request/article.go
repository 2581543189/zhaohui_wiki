package request

type ArticleQueryRequest struct {
	Id             uint   `json:"id"`
	Title          string `json:"title"`
	Platform       string `json:"platform"`
	Classification uint   `json:"classification"`
	Url            string `json:"url"`
	CurrentPage    uint   `json:"currentPage"`
	PageSize       uint   `json:"pageSize"`
	Sorter         string `json:"sorter"`
	ClassificationKey
}

func DefaultArticleQueryRequest() ArticleQueryRequest {
	return ArticleQueryRequest{CurrentPage: 1, PageSize: 10}
}

type ArticleAddOrUpdateRequest struct {
	Id             uint   `json:"id"`
	GmtCreate      string `json:"gmt_create"`
	Title          string `json:"title"`
	Platform       string `json:"platform"`
	Classification int    `json:"classification"`
	Url            string `json:"url"`
	ClassificationKey
}
