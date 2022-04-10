package service

import (
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"backend-golang/src/model/po"
	"backend-golang/src/model/request"
	"backend-golang/src/model/response"
	"backend-golang/src/util"
	"errors"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"time"
)

func Login(param *po.User) (*po.User, error) {
	password := util.Md5(param.Password)
	param.Password = ""
	data, err := param.One()
	if err != nil || data == nil {
		return param, errors.New("未查询到用户")
	}
	if password != data.Password {
		return param, errors.New("密码错误")
	}
	return data, nil
}

func GenerateTokenForUser(c *gin.Context, u *po.User) {
	j := &middleware.JWT{
		SigningKey: []byte(global.Conf.GetString("jwt.sign_key")), // 唯一签名
	}
	claims := request.UserClaims{
		Username: u.Name,
		StandardClaims: jwt.StandardClaims{
			NotBefore: time.Now().Unix() - 1000,    // 签名生效时间
			ExpiresAt: time.Now().Unix() + 60*60*2, // 过期时间 2h
			Issuer:    "asong",                     // 签名的发行者
		},
	}
	token, err := j.GenerateToken(claims)
	if err != nil {
		response.FailWithMessage("获取token失败", c)
		return
	}
	res := response.ResponseUser{Id: u.Id, Username: u.Name, Nickname: u.Name, Avatar: u.Avatar, Role: u.Role}
	response.OkWithData(response.LoginResponse{User: res, Token: token, ExpiresAt: claims.ExpiresAt * 1000}, c)
	return
}
