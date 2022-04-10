package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Book
type Book struct {
	Id             uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate      *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtEnd         *time.Time `gorm:"column:gmt_end" form:"gmt_end" json:"gmt_end" comment:"结束时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified    *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Name           string     `gorm:"column:name" form:"name" json:"name" comment:"书籍名称" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Author         string     `gorm:"column:author" form:"author" json:"author" comment:"作者名称" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Classification int        `gorm:"column:classification" form:"classification" json:"classification" comment:"classification 的主键id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
	Count          int        `gorm:"column:count" form:"count" json:"count" comment:"总页数" columnType:"int(32)" dataType:"int" columnKey:""`
	Current        int        `gorm:"column:current" form:"current" json:"current" comment:"当前阅读页数" columnType:"int(32)" dataType:"int" columnKey:""`
	Score          float32    `gorm:"column:score" form:"score" json:"score" comment:"豆瓣评分" columnType:"decimal(3,1)" dataType:"decimal" columnKey:""`
	Img            string     `gorm:"column:img" form:"img" json:"img" comment:"封面图片url" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
}

type BookWithClassification struct {
	Book
	request.ClassificationKey
}

func NewBook(req request.BookAddOrUpdateRequest) Book {
	now := time.Now()
	gmtCreate := util.ParseDateDefaultNow(req.GmtCreate)
	gmtEnd := util.ParseDateDefaultNull(req.GmtEnd)

	return Book{
		Id:             req.BookId,
		GmtCreate:      &gmtCreate,
		GmtEnd:         gmtEnd,
		GmtModified:    &now,
		Name:           req.Name,
		Author:         req.Author,
		Classification: req.Classification,
		Count:          util.SafeParseInt(req.Count),
		Current:        util.SafeParseInt(req.Current),
		Score:          util.SafeParseFloat(req.Score),
		Img:            req.Img,
	}
}

type BookWithClassificationVO struct {
	Book
	ClassificationKey request.ClassificationKey `json:"skill"`
}

// 对象转换
func NewBookWithClassification(article BookWithClassification) BookWithClassificationVO {
	skill := request.ClassificationKey{
		Type:             article.Type,
		First:            article.First,
		Second:           article.Second,
		Third:            article.Third,
		ClassificationId: article.ClassificationId,
	}
	ans := BookWithClassificationVO{
		Book:              article.Book,
		ClassificationKey: skill,
	}
	return ans
}

//TableName
func (m *Book) TableName() string {
	return "book"
}

//One
func (m *Book) One() (one *Book, err error) {
	one = &Book{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Book) All(q *util.PaginationQuery) (list *[]Book, total uint, err error) {
	list = &[]Book{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Book) Update() (err error) {
	where := Book{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Book) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Book) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}

func (m *BookWithClassification) AllWithClassification(q *util.PaginationQuery) (list *[]BookWithClassification, total uint, err error) {
	list = &[]BookWithClassification{}
	tx := global.GormDb.Debug().Table(m.TableName()).
		Select("book.*,c.type,c.first,c.second,c.third,c.id as classification_id").
		Joins("left join classification as c on c.id=book.classification")
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
