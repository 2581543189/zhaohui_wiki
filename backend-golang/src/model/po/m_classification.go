package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Classification
type Classification struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Type        string     `gorm:"column:type" form:"type" json:"type" comment:"类型,取值有:SKILL,LEETCODE,LEETCODE_EXP,BOOK_MARK,ENGLISH" columnType:"varchar(128)" dataType:"varchar" columnKey:"MUL"`
	First       string     `gorm:"column:first" form:"first" json:"first" comment:"大分类" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Second      string     `gorm:"column:second" form:"second" json:"second" comment:"二级分类" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Third       string     `gorm:"column:third" form:"third" json:"third" comment:"三级分类" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
}

func NewClassification(req request.ClassificationKey) Classification {
	now := time.Now()
	return Classification{
		Id:          req.ClassificationId,
		GmtCreate:   &now,
		GmtModified: &now,
		Type:        req.Type,
		First:       req.First,
		Second:      req.Second,
		Third:       req.Third,
	}
}
func NewClassificationByKey(req request.ClassificationKey) Classification {
	return Classification{
		Type:   req.Type,
		First:  req.First,
		Second: req.Second,
		Third:  req.Third,
	}
}

//TableName
func (m *Classification) TableName() string {
	return "classification"
}

//One
func (m *Classification) One() (one *Classification, err error) {
	one = &Classification{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Classification) All(q *util.PaginationQuery) (list *[]Classification, total uint, err error) {
	list = &[]Classification{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Classification) Update() (err error) {
	where := Classification{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Classification) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Classification) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
