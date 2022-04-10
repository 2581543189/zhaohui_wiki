package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Message
type Message struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"主键" columnType:"bigint(32)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Name        string     `gorm:"column:name" form:"name" json:"name" comment:"名称" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Avatar      string     `gorm:"column:avatar" form:"avatar" json:"avatar" comment:"头像url" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Content     string     `gorm:"column:content" form:"content" json:"content" comment:"内容" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Topic       int        `gorm:"column:topic" form:"topic" json:"topic" comment:"讨论的主题" columnType:"int(32)" dataType:"int" columnKey:""`
	Index       int        `gorm:"column:index" form:"index" json:"index" comment:"主题下的index" columnType:"int(32)" dataType:"int" columnKey:""`
}

func NewMessage(req request.MessageAddOrUpdateRequest) Message {
	now := time.Now()
	return Message{
		GmtCreate:   &now,
		GmtModified: &now,
		Name:        req.Name,
		Avatar:      req.Avatar,
		Content:     req.Content,
		Topic:       0,
		Index:       0,
	}
}

//TableName
func (m *Message) TableName() string {
	return "message"
}

//One
func (m *Message) One() (one *Message, err error) {
	one = &Message{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Message) All(q *util.PaginationQuery) (list *[]Message, total uint, err error) {
	list = &[]Message{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Message) Update() (err error) {
	where := Message{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Message) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Message) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
