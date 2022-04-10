package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Leetcode
type Leetcode struct {
	Id             uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate      *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified    *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Name           string     `gorm:"column:name" form:"name" json:"name" comment:"题目名称" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Difficulty     int        `gorm:"column:difficulty" form:"difficulty" json:"difficulty" comment:"0:简单,1:中等,2:困难" columnType:"int(32)" dataType:"int" columnKey:""`
	Frequency      int        `gorm:"column:frequency" form:"frequency" json:"frequency" comment:"次数" columnType:"int(32)" dataType:"int" columnKey:""`
	Url            string     `gorm:"column:url" form:"url" json:"url" comment:"题目链接" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Status         int        `gorm:"column:status" form:"status" json:"status" comment:"状态:0 有效 ,1 屏蔽" columnType:"int(32)" dataType:"int" columnKey:""`
	Classification int        `gorm:"column:classification" form:"classification" json:"classification" comment:"classification 的主键id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
}

//TableName
func (m *Leetcode) TableName() string {
	return "leetcode"
}

//One
func (m *Leetcode) One() (one *Leetcode, err error) {
	one = &Leetcode{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Leetcode) All(q *util.PaginationQuery) (list *[]Leetcode, total uint, err error) {
	list = &[]Leetcode{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Leetcode) Update() (err error) {
	where := Leetcode{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Leetcode) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Leetcode) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
