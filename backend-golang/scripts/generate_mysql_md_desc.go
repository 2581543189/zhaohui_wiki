package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

const (
	USERNAME = "root"
	PASSWORD = "123456"
	NETWORK  = "tcp"
	SERVER   = "47.99.76.20"
	PORT     = 3306
	DATABASE = "wiki_2022"
)

type Column struct {
	indox   int64
	name    string
	typo    string
	defoult string
	comment string
}

func main() {
	dsn := fmt.Sprintf("%s:%s@%s(%s:%d)/%s", USERNAME, PASSWORD, NETWORK, SERVER, PORT, DATABASE)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Printf("Open mysql failed,err:%v\n", err)
		return
	}
	db.SetConnMaxLifetime(100 * time.Second)
	db.SetMaxOpenConns(100)
	db.SetMaxIdleConns(16)
	tables := getTableInfo(db, "wiki_2022")
	index := 0
	for k, v := range tables {
		index++
		fmt.Println("")
		fmt.Println(fmt.Sprintf("##### &#160; &#160; &#160; &#160; 2.%d %s", index, k))
		fmt.Println("| 字段名称 | 数据类型   | 说明 | 默认值 |")
		fmt.Println("| :-: | :-: | :-: | :-: |")
		for i := range v {
			fmt.Println(fmt.Sprintf("| %s | %s | %s | %s |", v[i].name, v[i].typo, v[i].comment, v[i].defoult))
		}
		fmt.Println("")
	}

}

func getTableInfo(db *sql.DB, dbName string) map[string][]*Column {

	sqlGetTable := `
SELECT table_name tableName,table_comment tableComment
FROM INFORMATION_SCHEMA.TABLES
WHERE UPPER(table_type)='BASE TABLE'
AND LOWER(table_schema) = ?
ORDER BY table_name asc
`

	sqlGetColumns := `
SELECT 
       ORDINAL_POSITION indox,
       COLUMN_NAME name,
       COLUMN_TYPE typo,
       COLUMN_DEFAULT defoult,
       COLUMN_COMMENT comment
FROM INFORMATION_SCHEMA.COLUMNS
WHERE LOWER(table_schema) = ?
and LOWER(table_name) = ?
ORDER BY indox asc
`
	var result = make(map[string][]*Column)
	rows, err := db.Query(sqlGetTable, dbName)
	checkErr(err)
	for rows.Next() {
		var tableName, tableComment sql.NullString
		err = rows.Scan(&tableName, &tableComment)
		checkErr(err)

		rows, err := db.Query(sqlGetColumns, dbName, tableName.String)
		checkErr(err)
		var cols []*Column
		for rows.Next() {
			var indox sql.NullInt64
			var name, typo, defoult, comment sql.NullString
			err = rows.Scan(&indox, &name, &typo, &defoult, &comment)
			checkErr(err)
			col := &Column{indox.Int64, name.String, typo.String, defoult.String, comment.String}
			cols = append(cols, col)
		}
		key := fmt.Sprintf("%s(%s)", tableComment.String, tableName.String)
		result[key] = cols
	}
	return result
}

/**
 * 异常检查
 */
func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
