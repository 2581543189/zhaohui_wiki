package request

type LeetcodeQueryRequest struct {
	Id          uint   `json:"id"`
	CurrentPage uint   `json:"currentPage"`
	PageSize    uint   `json:"pageSize"`
	Sorter      string `json:"sorter"`
	Name        string `json:"name"`
	Difficulty  string `json:"difficulty"`
	Status      string `json:"status"`
	ClassificationKey
}

func DefaultLeetcodeQueryRequest() LeetcodeQueryRequest {
	return LeetcodeQueryRequest{CurrentPage: 1, PageSize: 10}
}

type LeetcodeInfo struct {
	Id             uint   `json:"id"`
	GmtCreate      string `json:"gmt_create"`
	Name           string `json:"name"`
	Difficulty     string `json:"difficulty"`
	Frequency      string `json:"frequency"`
	Url            string `json:"url"`
	Status         string `json:"status"`
	Classification int    `json:"classification"`
}

type LeetcodeAddOrUpdateRequest struct {
	LeetcodeInfo
	ClassificationKey
}
