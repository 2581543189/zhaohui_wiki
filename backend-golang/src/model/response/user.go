package response

type LoginResponse struct {
	User      ResponseUser `json:"user"`
	Token     string       `json:"token"`
	ExpiresAt int64        `json:"expiresAt"`
}

type ResponseUser struct {
	Id       uint   `json:"id"`
	Username string `json:"name"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
	Role     int    `json:"role"`
}
