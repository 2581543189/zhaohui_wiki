package global

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/sirupsen/logrus"
	"os"
	"strings"
	"time"
)

var (
	Conf     *Config
	Logger   *logrus.Logger
	Db       *sql.DB
	GormDb   *gorm.DB
	Engine   *gin.Engine
	GroupApi *gin.RouterGroup
)

// 初始化配置项
func init() {
	Conf = &Config{}
	Engine = gin.Default()
	prefix := Conf.GetString("App.api_prefix")
	api := "api"
	if prefix != "" {
		api = fmt.Sprintf("%s/%s", api, prefix)
	}
	GroupApi = Engine.Group(api)
}

// 初始化
func DoInit() {
	// 初始化日志
	initLogger()

	// 初始化DB
	initDb()
	initGormDb()
}

// 清理工作
func CleanUp() {
	if Db != nil {
		Db.Close()
	}
	if GormDb != nil {
		GormDb.Close()
	}
}

// 初始化 sql.DB
func initDb() {
	connInfo := fmt.Sprintf("%s:%s@(%s)/%s?charset=utf8&parseTime=True&loc=Local",
		Conf.GetString("db.user"),
		Conf.GetString("db.password"),
		Conf.GetString("db.addr"),
		Conf.GetString("db.database"))
	var err error
	Db, err = sql.Open("mysql", connInfo)
	if err != nil {
		Logger.WithFields(logrus.Fields{"err": err}).Error("init mysql err")
		panic("init mysql err")
	}
	err = Db.Ping()
	if err != nil {
		Logger.WithFields(logrus.Fields{"err": err}).Error("ping mysql")
	}
	Db.SetMaxIdleConns(Conf.GetInt("db.max_idle"))
	Db.SetMaxOpenConns(Conf.GetInt("db.max_open"))
	Db.SetConnMaxLifetime(5 * time.Minute)
}

//初始化 gorm.DB
func initGormDb() {
	if gormDB, err := createDatabase(); err == nil {
		GormDb = gormDB
	} else {
		logrus.WithError(err).Fatalln("create database connection failed")
		panic("create database connection failed")
	}
	//enable Gorm mysql log
	if flag := Conf.GetBool("App.enable_sql_log"); flag {
		GormDb.LogMode(flag)
	}
}

func createDatabase() (*gorm.DB, error) {
	dbType := Conf.GetString("db.type")
	dbAddr := Conf.GetString("db.addr")
	dbName := Conf.GetString("db.database")
	dbUser := Conf.GetString("db.user")
	dbPassword := Conf.GetString("db.password")
	dbCharset := Conf.GetString("db.charset")
	conn := ""
	switch dbType {
	case "mysql":
		conn = fmt.Sprintf("%s:%s@(%s)/%s?charset=%s&parseTime=True&loc=Local", dbUser, dbPassword, dbAddr, dbName, dbCharset)
	case "sqlite":
		conn = dbAddr
	case "mssql":
		return nil, errors.New("TODO:suport sqlServer")
	case "postgres":
		hostPort := strings.Split(dbAddr, ":")
		if len(hostPort) == 2 {
			return nil, errors.New("db.addr must be like this host:ip")
		}
		conn = fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable", hostPort[0], hostPort[1], dbUser, dbName, dbPassword)
	default:
		return nil, fmt.Errorf("database type %s is not supported by felix ginrbo", dbType)
	}
	return gorm.Open(dbType, conn)
}

// 初始化日志器材
func initLogger() {
	Logger = logrus.New()
	Logger.SetFormatter(&logrus.TextFormatter{})
	Logger.SetOutput(os.Stdout)
	Logger.SetLevel(logrus.DebugLevel)
}
