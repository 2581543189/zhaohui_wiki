package po

import (
	"backend-golang/src/global"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//LeetcodeExperience
type LeetcodeExperience struct {
	Id             uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate      *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified    *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Classification int        `gorm:"column:classification" form:"classification" json:"classification" comment:"classification 的主键id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
	LeetcodeId     int        `gorm:"column:leetcode_id" form:"leetcode_id" json:"leetcode_id" comment:"题目id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
	Desc           string     `gorm:"column:desc" form:"desc" json:"desc" comment:"描述" columnType:"text" dataType:"text" columnKey:""`
	Index          int        `gorm:"column:index" form:"index" json:"index" comment:"顺序" columnType:"int(32)" dataType:"int" columnKey:""`
}

//TableName
func (m *LeetcodeExperience) TableName() string {
	return "leetcode_experience"
}

//One
func (m *LeetcodeExperience) One() (one *LeetcodeExperience, err error) {
	one = &LeetcodeExperience{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *LeetcodeExperience) All(q *util.PaginationQuery) (list *[]LeetcodeExperience, total uint, err error) {
	list = &[]LeetcodeExperience{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *LeetcodeExperience) Update() (err error) {
	where := LeetcodeExperience{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *LeetcodeExperience) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *LeetcodeExperience) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
