package request

type EventQueryRequest struct {
	Offset int  `json:"offset"`
	Limit  uint `json:"limit"`
}

func DefaultEventQueryRequest() EventQueryRequest {
	return EventQueryRequest{Offset: 0, Limit: 10}
}
