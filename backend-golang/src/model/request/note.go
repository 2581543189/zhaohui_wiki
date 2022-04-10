package request

type NoteQueryRequest struct {
	Id          uint   `json:"id"`
	Name        string `json:"name"`
	CurrentPage uint   `json:"currentPage"`
	PageSize    uint   `json:"pageSize"`
	Sorter      string `json:"sorter"`
}

func DefaultNoteQueryRequest() NoteQueryRequest {
	return NoteQueryRequest{CurrentPage: 1, PageSize: 10}
}

type NoteAddOrUpdateRequest struct {
	Id        uint   `json:"id"`
	GmtCreate string `json:"gmt_create"`
	GmtEnd    string `json:"gmt_end"`
	BookName  string `json:"bookName"`
	Book      int    `json:"book"`
	Total     int    `json:"total"`
	Current   int    `json:"current"`
	Url       string `json:"url"`
}
