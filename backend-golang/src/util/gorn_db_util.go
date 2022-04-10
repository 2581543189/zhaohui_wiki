package util

import (
	"backend-golang/src/global"
	"errors"
	"fmt"
	"github.com/jinzhu/gorm"
	"reflect"
	"strconv"
	"strings"
	"time"
)

//PaginationQuery gin handler query binding struct
type PaginationQuery struct {
	Where  map[string]interface{}
	Fields string `form:"fields"`
	Order  string `form:"order"`
	Offset uint   `form:"offset"`
	Limit  uint   `form:"limit"`
}

//String to string
func (pq *PaginationQuery) String() string {
	return fmt.Sprintf("w=%v_f=%s_o=%s_of=%d_l=%d", pq.Where, pq.Fields, pq.Order, pq.Offset, pq.Limit)
}

func CrudAll(m interface{}, q *PaginationQuery, list interface{}) (total uint, err error) {
	var tx *gorm.DB
	total, tx = getResourceCount(m, q)
	if q.Fields != "" {
		columns := strings.Split(q.Fields, ",")
		if len(columns) > 0 {
			tx = tx.Select(q.Fields)
		}
	}
	if q.Order != "" {
		tx = tx.Order(q.Order)
	}
	if q.Offset > 0 {
		tx = tx.Offset(q.Offset)
	}
	if q.Limit <= 0 {
		q.Limit = 15
	}
	err = tx.Limit(q.Limit).Find(list).Error
	return
}

func CrudOne(m interface{}, one interface{}) (err error) {
	if global.GormDb.Where(m).First(one).RecordNotFound() {
		return errors.New("resource is not found")
	}
	return nil
}

func CrudUpdate(m interface{}, where interface{}) (err error) {
	db := global.GormDb.Model(where).Updates(m)
	if err = db.Error; err != nil {
		return
	}
	if db.RowsAffected != 1 {
		return errors.New("id is invalid and resource is not found")
	}
	return nil
}

func CrudDelete(m interface{}) (err error) {
	//WARNING When delete a record, you need to ensure it’s primary field has value, and GORM will use the primary key to delete the record, if primary field’s blank, GORM will delete all records for the model
	//primary key must be not zero value
	db := global.GormDb.Delete(m)
	if err = db.Error; err != nil {
		return
	}
	if db.RowsAffected != 1 {
		return errors.New("resource is not found to destroy")
	}
	return nil
}

func GetType(v interface{}) string {
	t := reflect.TypeOf(v)
	if t.Kind() == reflect.Ptr {
		return "*" + t.Elem().Name()
	}
	return t.Name()
}

func getResourceCount(m interface{}, q *PaginationQuery) (uint, *gorm.DB) {
	var tx = global.GormDb.Model(m)
	//conditions := strings.Split(q.Where, ",")
	for key, val := range q.Where {
		tx = tx.Where(key, val)
	}
	var count uint
	tx.Count(&count)
	return count, tx
}

// 解析排序规则
func ParseSorter(table, sorter string) string {
	ans := ""
	if len(sorter) > 0 {
		array := strings.Split(sorter, "|")
		if len(array) == 2 {
			ans += array[0]
			ans += " "
			if array[1] == "descend" {
				ans += "desc"
			} else {
				ans += "asc"
			}
		}
	}
	if len(ans) == 0 {
		ans = table + ".gmt_create desc"
	}
	return ans
}

// 解析时间
func ParseDateDefaultNow(s string) time.Time {
	now := time.Now()
	if len(s) > 0 {
		parseDate, err := time.ParseInLocation("2006-01-02 15:04:05", s, time.Local)
		if err != nil {
			return now
		} else {
			return parseDate
		}
	}
	return now
}

func ParseDateDefaultNull(s string) *time.Time {
	now := (*time.Time)(nil)
	if len(s) > 0 {
		parseDate, err := time.ParseInLocation("2006-01-02 15:04:05", s, time.Local)
		if err != nil {
			return now
		} else {
			return &parseDate
		}
	}
	return now
}

func SafeParseFloat(s string) float32 {
	val, err := strconv.ParseFloat(s, 32)
	if err != nil {
		return 0
	}
	return float32(val)
}

func SafeParseInt(s string) int {
	val, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return val
}
