package util

import (
	"backend-golang/src/model/response"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"strconv"
)

func JsonData(c *gin.Context, data interface{}) {
	response.OkWithData(data, c)
}
func JsonPagination(c *gin.Context, list interface{}, total uint, query *PaginationQuery) {
	c.JSON(200, gin.H{"code": 1, "data": list, "total": total, "offset": query.Offset, "limit": query.Limit})
}
func JsonSuccess(c *gin.Context) {
	response.Ok(c)
}

func HandleError(c *gin.Context, err error) bool {
	if err != nil {
		response.FailWithMessage(err.Error(), c)
		return true
	}
	return false
}

func HandleErrorWithData(c *gin.Context, data interface{}, err error) bool {
	if err != nil {
		response.FailWithDetailed(response.ERROR, data, err.Error(), c)
		return true
	}
	return false
}

func ParseParamID(c *gin.Context) (uint, error) {
	id := c.Param("id")
	parseId, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return 0, errors.New("id must be an unsigned int")
	}
	return uint(parseId), nil
}

// 安全json
func JsonNoException(data interface{}) string {
	ans, err := json.Marshal(data)
	if err != nil {
		return fmt.Sprint("%v", data)
	}
	return string(ans)
}
