package request

type EventQueryRequest struct {
	Offset int    `json:"offset"`
	Limit  uint   `json:"limit"`
	Type   string `json:"type"`
}

func DefaultEventQueryRequest() EventQueryRequest {
	return EventQueryRequest{Offset: 0, Limit: 10}
}
