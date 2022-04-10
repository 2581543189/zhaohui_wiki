package handlers

import (
	"backend-golang/src/global"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/autotls"
	"github.com/gin-gonic/gin"
	"log"
	"path"
)

//in the same package init executes in file'name alphabet order
func init() {
	if sp := global.Conf.GetString("App.static_path"); sp != "" {
		global.Engine.Use(static.Serve("/", static.LocalFile(sp, true)))
		if global.Conf.GetBool("App.enable_not_found") {
			global.Engine.NoRoute(func(c *gin.Context) {
				file := path.Join(sp, "index.html")
				c.File(file)
			})
		}
	}
	if global.Conf.GetString("App.env") != "prod" {
		global.Engine.GET("/App/info", func(c *gin.Context) {
			c.JSON(200, global.Conf.GetStringMapString("App"))
		})
	}
}

//ServerRun start the gin server
func ServerRun() {
	addr := global.Conf.GetString("App.addr")
	if global.Conf.GetBool("App.enable_https") {
		log.Fatal(autotls.Run(global.Engine, addr))
	} else {
		//log.Printf("visit http://%s/doc for RESTful APIs Document", addr)
		log.Printf("visit http://%s/ for front-end static html files", addr)
		log.Printf("visit http://%s/App/info for App info only on not-prod mode", addr)
		global.Engine.Run(addr)
	}

}
