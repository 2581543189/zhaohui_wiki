package main

import (
	"backend-golang/src/global"
	"backend-golang/src/handlers"
	"backend-golang/src/router"
	"backend-golang/src/tasks"
)

func main() {

	// 初始化 global
	global.DoInit()
	// 初始化 router
	router.RoutersInit()
	// 启动服务

	if global.Conf.GetBool("App.enable_cron") {
		go tasks.RunTasks()
	}
	defer global.CleanUp()
	handlers.ServerRun()
}
