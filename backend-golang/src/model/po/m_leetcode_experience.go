package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
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

type LeetcodeExperienceWithClassification struct {
	LeetcodeExperience
	Name string `json:"name"`
	request.ClassificationKey
}

func NewLeetcodeExperience(req request.LeetcodeExpInfoAddOrUpdateRequest) LeetcodeExperience {
	now := time.Now()
	return LeetcodeExperience{
		Id:             req.Id,
		GmtCreate:      &now,
		GmtModified:    &now,
		LeetcodeId:     req.LeetcodeId,
		Desc:           req.Desc,
		Index:          util.SafeParseInt(req.Index),
		Classification: req.Classification,
	}
}

type LeetcodeExperienceWithClassificationVO struct {
	LeetcodeExperience
	Name              string                    `json:"name"`
	ClassificationKey request.ClassificationKey `json:"skill"`
}

// 对象转换
func NewLeetcodeExperienceWithClassification(origin LeetcodeExperienceWithClassification) LeetcodeExperienceWithClassificationVO {
	skill := request.ClassificationKey{
		Type:             origin.Type,
		First:            origin.First,
		Second:           origin.Second,
		Third:            origin.Third,
		ClassificationId: origin.ClassificationId,
	}
	ans := LeetcodeExperienceWithClassificationVO{
		LeetcodeExperience: origin.LeetcodeExperience,
		Name:               origin.Name,
		ClassificationKey:  skill,
	}
	return ans
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

func (m *LeetcodeExperienceWithClassification) AllWithClassification(q *util.PaginationQuery) (list *[]LeetcodeExperienceWithClassification, total uint, err error) {
	list = &[]LeetcodeExperienceWithClassification{}
	tx := global.GormDb.Debug().Table(m.TableName()).
		Select("leetcode_experience.*,l.name as name ,c.type,c.first,c.second,c.third,c.id as classification_id").
		Joins("left join classification as c on c.id=leetcode_experience.classification").
		Joins("left join leetcode as l on l.id=leetcode_experience.leetcode_id")
	for key, val := range q.Where {
		tx = tx.Where(key, val)
	}
	var count uint
	tx.Count(&count)
	if q.Order != "" {
		tx = tx.Order(q.Order)
	}
	if q.Offset > 0 {
		tx = tx.Offset(q.Offset)
	}
	if q.Limit <= 0 {
		q.Limit = 15
	}
	tx = tx.Limit(q.Limit)
	if err := tx.Find(&list).Error; err != nil {
		return nil, 0, err
	}

	return list, count, nil
}
