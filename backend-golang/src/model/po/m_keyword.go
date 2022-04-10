package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Keyword
type Keyword struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Name        string     `gorm:"column:name" form:"name" json:"name" comment:"名称" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Desc        string     `gorm:"column:desc" form:"desc" json:"desc" comment:"描述" columnType:"text" dataType:"text" columnKey:""`
	Url         string     `gorm:"column:url" form:"url" json:"url" comment:"访问链接" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
}

//TableName
func (m *Keyword) TableName() string {
	return "keyword"
}

//One
func (m *Keyword) One() (one *Keyword, err error) {
	one = &Keyword{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Keyword) All(q *util.PaginationQuery) (list *[]Keyword, total uint, err error) {
	list = &[]Keyword{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Keyword) Update() (err error) {
	where := Keyword{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Keyword) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Keyword) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
