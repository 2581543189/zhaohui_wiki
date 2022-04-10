package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//ForeignWord
type ForeignWord struct {
	Id             uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate      *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified    *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	ForeignArticle int        `gorm:"column:foreign_article" form:"foreign_article" json:"foreign_article" comment:"文章id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
	Word           string     `gorm:"column:word" form:"word" json:"word" comment:"词语" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
}

//TableName
func (m *ForeignWord) TableName() string {
	return "foreign_word"
}

//One
func (m *ForeignWord) One() (one *ForeignWord, err error) {
	one = &ForeignWord{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *ForeignWord) All(q *util.PaginationQuery) (list *[]ForeignWord, total uint, err error) {
	list = &[]ForeignWord{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *ForeignWord) Update() (err error) {
	where := ForeignWord{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *ForeignWord) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *ForeignWord) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
