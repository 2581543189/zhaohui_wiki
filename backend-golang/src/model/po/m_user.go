package po

import (
	"backend-golang/src/global"
	"backend-golang/src/model/request"
	"backend-golang/src/util"
	"errors"
	"time"
)

var _ = time.Thursday

//User
type User struct {
	Id          uint       `gorm:"column:id" form:"id" json:"id" comment:"唯一主键" columnType:"bigint(128)" dataType:"bigint" columnKey:"PRI"`
	GmtCreate   *time.Time `gorm:"column:gmt_create" form:"gmt_create" json:"gmt_create" comment:"创建时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	GmtModified *time.Time `gorm:"column:gmt_modified" form:"gmt_modified" json:"gmt_modified" comment:"更新时间" columnType:"timestamp" dataType:"timestamp" columnKey:""`
	Name        string     `gorm:"column:name" form:"name" json:"name" comment:"用户名" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Password    string     `gorm:"column:password" form:"password" json:"password" comment:"MD5 的密码值" columnType:"varchar(128)" dataType:"varchar" columnKey:""`
	Role        int        `gorm:"column:role" form:"role" json:"role" comment:"角色 0:管理员,1:用户 " columnType:"int(32)" dataType:"int" columnKey:""`
	Avatar      string     `gorm:"column:avatar" form:"avatar" json:"avatar" comment:"头像图片url" columnType:"varchar(1024)" dataType:"varchar" columnKey:""`
}

func NewUser(req request.UserAddOrUpdateRequest) User {
	now := time.Now()
	return User{
		GmtCreate:   &now,
		GmtModified: &now,
		Name:        req.Name,
		Password:    req.Password,
		Role:        req.Role,
		Avatar:      req.Avatar,
		Id:          req.Id,
	}
}

//TableName
func (m *User) TableName() string {
	return "user"
}

//One
func (m *User) One() (one *User, err error) {
	one = &User{}
	err = util.CrudOne(m, one)
	return
}

//All
func (m *User) All(q *util.PaginationQuery) (list *[]User, total uint, err error) {
	list = &[]User{}
	total, err = util.CrudAll(m, q, list)
	return
}

//Update
func (m *User) Update() (err error) {
	where := User{Id: m.Id}
	m.Id = 0

	return util.CrudUpdate(m, where)
}

//CreateUserOfRole
func (m *User) CreateUserOfRole() (err error) {
	m.Id = 0

	return global.GormDb.Create(m).Error
}

//Delete
func (m *User) Delete() (err error) {
	if m.Id == 0 {
		return errors.New("resource must not be zero value")
	}
	return util.CrudDelete(m)
}
