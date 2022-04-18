package router

import (
	_ "backend-golang/docs"
	"backend-golang/src/global"
	"backend-golang/src/middleware"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func RoutersInit() *gin.Engine {
	addr := global.Conf.GetString("App.addr")
	var Router = global.Engine
	// 跨域
	Router.Use(middleware.Cors())
	Router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	global.Logger.Printf("swagger文档地址：http://%s/swagger/index.html", addr)
	RouterGroup := global.GroupApi

	initUserRoute(RouterGroup)
	initCommonRoute(RouterGroup)
	initClassificationRoute(RouterGroup)
	initArticleRoute(RouterGroup)
	initBookRoute(RouterGroup)
	initNoteRoute(RouterGroup)
	initEventRoute(RouterGroup)
	initMessageRoute(RouterGroup)
	initMettoRoute(RouterGroup)
	initOverViewRoute(RouterGroup)
	initLeetcodeRoute(RouterGroup)
	initLeetcodeExpRoute(RouterGroup)

	global.Logger.Info("router register success")
	return Router
}
