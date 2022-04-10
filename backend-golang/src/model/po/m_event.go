package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Event
type Event struct {
	Id           uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate    *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified  *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Type         string     `gorm:"column:type" form:"type" json:"type" comment:"类型" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Desc         string     `gorm:"column:desc" form:"desc" json:"desc" comment:"描述" columnType:"text" dataType:"text" columnKey:""`
	TriggerTable string     `gorm:"column:trigger_table" form:"trigger_table" json:"trigger_table" comment:"触发新鲜事的变更表表名" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	TriggerId    int        `gorm:"column:trigger_id" form:"trigger_id" json:"trigger_id" comment:"触发新鲜事的变更表的数据id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
	Extend       string     `gorm:"column:extend" form:"extend" json:"extend" comment:"扩展字段" columnType:"text" dataType:"text" columnKey:""`
}

//TableName
func (m *Event) TableName() string {
	return "event"
}

//One
func (m *Event) One() (one *Event, err error) {
	one = &Event{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Event) All(q *util.PaginationQuery) (list *[]Event, total uint, err error) {
	list = &[]Event{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Event) Update() (err error) {
	where := Event{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Event) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Event) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
