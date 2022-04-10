package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//Note
type Note struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Book        int        `gorm:"column:book" form:"book" json:"book" comment:"书籍的唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"MUL"`
	Total       int        `gorm:"column:total" form:"total" json:"total" comment:"总页数" columnType:"int(32)" dataType:"int" columnKey:""`
	Current     int        `gorm:"column:current" form:"current" json:"current" comment:"当前阅读进度" columnType:"int(32)" dataType:"int" columnKey:""`
	Url         string     `gorm:"column:url" form:"url" json:"url" comment:"笔记链接" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
}

type NoteWithBook struct {
	Note
	request.BookInfo
}

func NewNote(req request.NoteAddOrUpdateRequest) Note {
	now := time.Now()
	gmtCreate := util.ParseDateDefaultNow(req.GmtCreate)
	return Note{
		Id:          req.Id,
		GmtCreate:   &gmtCreate,
		GmtModified: &now,
		Book:        req.Book,
		Total:       req.Total,
		Current:     req.Current,
		Url:         req.Url,
	}
}

type NoteWithBookVO struct {
	Note
	BookInfo request.BookInfo `json:"book"`
}

// 对象转换
func NewNoteWithBook(note NoteWithBook) NoteWithBookVO {
	book := request.BookInfo{
		BookId:         note.BookId,
		GmtCreate:      note.BookInfo.GmtCreate,
		GmtEnd:         note.GmtEnd,
		Name:           note.Name,
		Author:         note.Author,
		Count:          note.Count,
		Current:        note.BookInfo.Current,
		Score:          note.Score,
		Img:            note.Img,
		Classification: note.Classification,
	}
	ans := NoteWithBookVO{
		Note:     note.Note,
		BookInfo: book,
	}
	return ans
}

//TableName
func (m *Note) TableName() string {
	return "note"
}

//One
func (m *Note) One() (one *Note, err error) {
	one = &Note{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *Note) All(q *util.PaginationQuery) (list *[]Note, total uint, err error) {
	list = &[]Note{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *Note) Update() (err error) {
	where := Note{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *Note) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *Note) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}

func (m *NoteWithBook) AllWithBook(q *util.PaginationQuery) (list *[]NoteWithBook, total uint, err error) {
	list = &[]NoteWithBook{}
	tx := global.GormDb.Debug().Table(m.TableName()).
		Select("note.*,book.*").
		Joins("left join book on note.book=book.id")
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
