package response

type PageResponse struct {
	Count uint        `json:"count"`
	List  interface{} `json:"list"`
}

type StreamResponse struct {
	Offset int         `json:"offset"`
	List   interface{} `json:"list"`
}
