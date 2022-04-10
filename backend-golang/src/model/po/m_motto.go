package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Motto
type Motto struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Content     string     `gorm:"column:content" form:"content" json:"content" comment:"内容" columnType:"text" dataType:"text" columnKey:""`
}

//TableName
func (m *Motto) TableName() string {
	return "motto"
}

//One
func (m *Motto) One() (one *Motto, err error) {
	one = &Motto{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Motto) All(q *util.PaginationQuery) (list *[]Motto, total uint, err error) {
	list = &[]Motto{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Motto) Update() (err error) {
	where := Motto{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Motto) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Motto) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
