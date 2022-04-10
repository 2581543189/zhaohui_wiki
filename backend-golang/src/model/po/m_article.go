package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Article
type Article struct {
	Id             uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate      *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified    *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Title          string     `gorm:"column:title" form:"title" json:"title" comment:" 文章标题" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
	Platform       string     `gorm:"column:platform" form:"platform" json:"platform" comment:"发表平台" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Classification int        `gorm:"column:classification" form:"classification" json:"classification" comment:"classification 的主键id" columnType:"bigint(128)" dataType:"bigint" columnKey:""`
	Url            string     `gorm:"column:url" form:"url" json:"url" comment:"访问链接" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
}

type ArticleWithClassification struct {
	Article
	request.ClassificationKey
}

func NewArticle(req request.ArticleAddOrUpdateRequest) Article {
	now := time.Now()
	gmtCreate := util.ParseDateDefaultNow(req.GmtCreate)
	return Article{
		Id:             req.Id,
		GmtCreate:      &gmtCreate,
		GmtModified:    &now,
		Title:          req.Title,
		Platform:       req.Platform,
		Classification: req.Classification,
		Url:            req.Url,
	}
}

type ArticleWithClassificationVO struct {
	Article
	ClassificationKey request.ClassificationKey `json:"skill"`
}

// 对象转换
func NewArticleWithClassification(article ArticleWithClassification) ArticleWithClassificationVO {
	skill := request.ClassificationKey{
		Type:             article.Type,
		First:            article.First,
		Second:           article.Second,
		Third:            article.Third,
		ClassificationId: article.ClassificationId,
	}
	ans := ArticleWithClassificationVO{
		Article:           article.Article,
		ClassificationKey: skill,
	}
	return ans
}

//TableName
func (m *Article) TableName() string {
	return "article"
}

//One
func (m *Article) One() (one *Article, err error) {
	one = &Article{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Article) All(q *util.PaginationQuery) (list *[]Article, total uint, err error) {
	list = &[]Article{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Article) Update() (err error) {
	where := Article{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Article) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Article) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}

func (m *ArticleWithClassification) AllWithClassification(q *util.PaginationQuery) (list *[]ArticleWithClassification, total uint, err error) {
	list = &[]ArticleWithClassification{}
	tx := global.GormDb.Debug().Table(m.TableName()).
		Select("article.*,c.type,c.first,c.second,c.third,c.id as classification_id").
		Joins("left join classification as c on c.id=article.classification")
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
