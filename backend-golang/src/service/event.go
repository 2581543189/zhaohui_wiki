package service

import (
	"backend-golang/src/global"
	"backend-golang/src/model/po"
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"
)

func AddEvent(obj interface{}) {
	var event = po.Event{}
	now := time.Now()
	event.GmtCreate = &now
	switch t := obj.(type) {
	case po.Leetcode:
		// 获取classfication
		inDb, err := (&po.Classification{Id: uint(t.Classification)}).One()
		if err != nil {
			log.Printf("err:%v", err)
			return
		}
		//
		event.Type = "LEETCODE"
		event.Desc = "收藏了算法题[" + t.Name + "]难度为[" + global.DIFFICULTIES[t.Difficulty] + "]" +
			",相关分类是[" + inDb.First + "/" + inDb.Second + "]"
		event.TriggerId = int(t.Id)
		event.TriggerTable = "leetcode"
		event.CreateUserOfRole()
	case po.LeetcodeExperience:
		// 获取classfication
		inDb1, err := (&po.Classification{Id: uint(t.Classification)}).One()
		if err != nil {
			log.Printf("err:%v", err)
			return
		}
		// 获取题目
		inDb2, err := (&po.Leetcode{Id: uint(t.LeetcodeId)}).One()
		if err != nil {
			log.Printf("err:%v", err)
			return
		}
		event.Type = "LEETCODE_EXP"
		event.Desc = "题目[" + inDb2.Name + "]增加了笔记:[" + t.Desc + "],相关分类是[" + inDb1.First + "/" + inDb1.Second + "]"
		event.TriggerId = int(t.Id)
		event.TriggerTable = "leetcode_experience"
		event.CreateUserOfRole()
	case po.Note:
		//新增了《Command Line Heros》的读书笔记,目前已经阅读到[8/100]页
		// 获取 book
		inDb, err := (&po.Book{Id: uint(t.Book)}).One()
		if err != nil {
			log.Printf("err:%v", err)
			return
		}
		event.Type = "NOTE"
		event.Desc = "新增了《" + inDb.Name + "》的读书笔记,目前已经阅读到[" + strconv.Itoa(t.Current) + "/" + strconv.Itoa(inDb.Count) + "]页"
		event.TriggerId = int(t.Id)
		event.TriggerTable = "note"
		event.CreateUserOfRole()
	case po.Book:
		//关注了书籍《ZooKeeper:分布式过程协同技术详解》,相关分类是[计算机技术/开源框架/zookeeper]
		// 获取classfication
		inDb, err := (&po.Classification{Id: uint(t.Classification)}).One()
		if err != nil {
			log.Printf("err:%v", err)
			return
		}
		event.Type = "BOOK"
		event.Desc = "关注了书籍《" + t.Name + "》,相关分类是[" + inDb.First + "/" + inDb.Second + "/" + inDb.Third + "]"
		event.TriggerId = int(t.Id)
		event.TriggerTable = "book"
		event.CreateUserOfRole()
	case po.Article:
		//在[知乎]平台发表了《wait、notify和synchronized块》
		event.Type = "ARTICLE"
		event.Desc = "在[" + t.Platform + "]平台发表了《" + t.Title + "》"
		event.TriggerId = int(t.Id)
		event.TriggerTable = "article"
		event.CreateUserOfRole()
	case po.Message:
		//[hui.zhao]留言说:[KABLOOIE!]
		event.Type = "ARTICLE"
		event.Desc = "[" + t.Name + "]留言说:[" + t.Content + "]"
		event.TriggerId = int(t.Id)
		event.TriggerTable = "article"
		event.CreateUserOfRole()
	default:
		fmt.Printf("Unexpected type %T\n", t)
	}
}
func DeleteEvent(obj interface{}) {
	var id int = 0
	switch t := obj.(type) {
	case po.Leetcode:
		id = getId("leetcode", strconv.Itoa(int(t.Id)))
	case po.LeetcodeExperience:
		id = getId("leetcode_experience", strconv.Itoa(int(t.Id)))
	case po.Note:
		id = getId("note", strconv.Itoa(int(t.Id)))
	case po.Book:
		id = getId("book", strconv.Itoa(int(t.Id)))
	case po.Article:
		id = getId("article", strconv.Itoa(int(t.Id)))
	case po.Message:
		id = getId("message", strconv.Itoa(int(t.Id)))
	default:
		fmt.Printf("Unexpected type %T\n", t)
	}
	if id > 0 {
		(&po.Event{Id: uint(id)}).Delete()
	}
}

// 执行sql，获取数量
func getId(tableName, id string) int {
	sqlStr := "select id from event where trigger_table = '" + tableName + "' and trigger_id = '" + id + "'"
	rows, err := global.Db.Query(sqlStr)
	if err != nil {
		return 0
	}
	defer rows.Close()
	for rows.Next() {
		var val sql.NullInt32
		err = rows.Scan(&val)
		if err != nil {
			return 0
		}
		return int(val.Int32)
	}
	return 0
}
