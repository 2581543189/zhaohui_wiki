package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//ForeignArticle
type ForeignArticle struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Name        string     `gorm:"column:name" form:"name" json:"name" comment:"名称" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Desc        string     `gorm:"column:desc" form:"desc" json:"desc" comment:"描述" columnType:"text" dataType:"text" columnKey:""`
	Url         string     `gorm:"column:url" form:"url" json:"url" comment:"访问链接" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	NewWords    int        `gorm:"column:new_words" form:"new_words" json:"new_words" comment:"生词数量" columnType:"int(32)" dataType:"int" columnKey:""`
}

//TableName
func (m *ForeignArticle) TableName() string {
	return "foreign_article"
}

//One
func (m *ForeignArticle) One() (one *ForeignArticle, err error) {
	one = &ForeignArticle{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *ForeignArticle) All(q *util.PaginationQuery) (list *[]ForeignArticle, total uint, err error) {
	list = &[]ForeignArticle{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *ForeignArticle) Update() (err error) {
	where := ForeignArticle{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *ForeignArticle) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *ForeignArticle) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
