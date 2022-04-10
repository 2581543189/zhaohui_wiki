package request

import (
	"github.com/dgrijalva/jwt-go"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserQueryRequest struct {
	Id          uint   `json:"id"`
	CurrentPage uint   `json:"currentPage"`
	PageSize    uint   `json:"pageSize"`
	Name        string `json:"name"`
	Role        string `json:"role"`
	Sorter      string `json:"sorter"`
}

func DefaultUserQueryRequest() UserQueryRequest {
	return UserQueryRequest{CurrentPage: 1, PageSize: 10}
}

type UserClaims struct {
	Username string
	jwt.StandardClaims
}

type UserAddOrUpdateRequest struct {
	Id       uint   `json:"id"`
	Name     string `json:"name"`
	Password string `json:"password"`
	Role     int    `json:"role"`
	Avatar   string `json:"avatar"`
}
