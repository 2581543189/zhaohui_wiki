package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
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
type LeetcodeWithClassification struct {
	Leetcode
	request.ClassificationKey
}

func NewLeetcode(req request.LeetcodeAddOrUpdateRequest) Leetcode {
	now := time.Now()
	gmtCreate := util.ParseDateDefaultNow(req.GmtCreate)
	return Leetcode{
		Id:             req.Id,
		GmtCreate:      &gmtCreate,
		GmtModified:    &now,
		Name:           req.Name,
		Difficulty:     util.SafeParseInt(req.Difficulty),
		Frequency:      util.SafeParseInt(req.Frequency),
		Url:            req.Url,
		Status:         util.SafeParseInt(req.Status),
		Classification: req.Classification,
	}
}

type LeetcodeWithClassificationVO struct {
	Leetcode
	ClassificationKey request.ClassificationKey `json:"skill"`
}

// 对象转换
func NewLeetcodeWithClassification(origin LeetcodeWithClassification) LeetcodeWithClassificationVO {
	skill := request.ClassificationKey{
		Type:             origin.Type,
		First:            origin.First,
		Second:           origin.Second,
		Third:            origin.Third,
		ClassificationId: origin.ClassificationId,
	}
	ans := LeetcodeWithClassificationVO{
		Leetcode:          origin.Leetcode,
		ClassificationKey: skill,
	}
	return ans
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
func (m *LeetcodeWithClassification) AllWithClassification(q *util.PaginationQuery) (list *[]LeetcodeWithClassification, total uint, err error) {
	list = &[]LeetcodeWithClassification{}
	tx := global.GormDb.Debug().Table(m.TableName()).
		Select("leetcode.*,c.type,c.first,c.second,c.third,c.id as classification_id").
		Joins("left join classification as c on c.id=leetcode.classification")
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
