package request

type LeetcodeExpQueryRequest struct {
	Id          uint   `json:"id"`
	CurrentPage uint   `json:"currentPage"`
	PageSize    uint   `json:"pageSize"`
	Sorter      string `json:"sorter"`
	LeetcodeId  uint   `json:"leetcodeId"`
	ClassificationKey
}

func DefaultLeetcodeExpQueryRequest() LeetcodeExpQueryRequest {
	return LeetcodeExpQueryRequest{CurrentPage: 1, PageSize: 10}
}

type LeetcodeExpInfo struct {
	Id             uint   `json:"id"`
	GmtCreate      string `json:"gmt_create"`
	Leetcode       string `json:"leetcode"`
	LeetcodeId     int    `json:"leetcodeId"`
	Desc           string `json:"desc"`
	Index          string `json:"index"`
	Classification int    `json:"classification"`
}

type LeetcodeExpInfoAddOrUpdateRequest struct {
	LeetcodeExpInfo
	ClassificationKey
}
