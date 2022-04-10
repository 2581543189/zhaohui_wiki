package request

type ClassificationQueryRequest struct {
	Id          uint   `json:"id"`
	CurrentPage uint   `json:"currentPage"`
	PageSize    uint   `json:"pageSize"`
	Type        string `json:"type"`
	First       string `json:"first"`
	Second      string `json:"second"`
	Third       string `json:"third"`
	Sorter      string `json:"sorter"`
}

func DefaultClassificationQueryRequest() ClassificationQueryRequest {
	return ClassificationQueryRequest{CurrentPage: 1, PageSize: 10}
}

type ClassificationKey struct {
	ClassificationId uint   `json:"id"`
	Type             string `json:"type"`
	First            string `json:"first"`
	Second           string `json:"second"`
	Third            string `json:"third"`
}

type ClassificationDistinctRequest struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	First  string `json:"first"`
	Second string `json:"second"`
	Third  string `json:"third"`
}
