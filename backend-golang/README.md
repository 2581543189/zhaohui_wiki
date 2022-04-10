[toc]
## 后端系统设计文档



#### 1. 简介
&#160; &#160; &#160; &#160; 为前端端提供数据接口.

#### 2. 数据库结构设计
##### &#160; &#160; &#160; &#160; 2.1 文章表(article)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| title | varchar(1024) |  文章标题 |  |
| platform | varchar(128) | 发表平台 | 其他 |
| classification | bigint(128) | classification 的主键id | 0 |
| url | varchar(1024) | 访问链接 |  |


##### &#160; &#160; &#160; &#160; 2.2 分类表(classification)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| type | varchar(128) | 类型,取值有:SKILL,LEETCODE,LEETCODE_EXP,BOOK_MARK,ENGLISH | SKILL |
| first | varchar(128) | 大分类 | 其他 |
| second | varchar(128) | 二级分类 | 其他 |
| third | varchar(128) | 三级分类 | 其他 |


##### &#160; &#160; &#160; &#160; 2.3 事件表(event)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| type | varchar(128) | 类型 |  |
| desc | text | 描述 |  |
| trigger_table | varchar(128) | 触发新鲜事的变更表表名 |  |
| trigger_id | bigint(128) | 触发新鲜事的变更表的数据id | 0 |
| extend | text | 扩展字段 |  |


##### &#160; &#160; &#160; &#160; 2.4 外语文章表(foreign_article)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| name | varchar(1024) | 名称 |  |
| desc | text | 描述 |  |
| url | varchar(1024) | 访问链接 |  |
| new_words | int(32) | 生词数量 | 0 |


##### &#160; &#160; &#160; &#160; 2.5 箴言表(motto)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| content | text | 内容 |  |


##### &#160; &#160; &#160; &#160; 2.6 算法题表(leetcode)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| name | varchar(1024) | 题目名称 |  |
| difficulty | int(32) | 0:简单,1:中等,2:困难 | 0 |
| frequency | int(32) | 次数 | 0 |
| url | varchar(1024) | 题目链接 |  |
| status | int(32) | 状态:0 有效 ,1 屏蔽 | 0 |
| classification | bigint(128) | classification 的主键id | 0 |


##### &#160; &#160; &#160; &#160; 2.7 算法题心得总结表(leetcode_experience)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| classification | bigint(128) | classification 的主键id | 0 |
| leetcode_id | bigint(128) | 题目id | 0 |
| desc | text | 描述 |  |
| index | int(32) | 顺序 | 0 |


##### &#160; &#160; &#160; &#160; 2.8 留言表(message)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(32) | 主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| name | varchar(128) | 名称 |  |
| avatar | varchar(1024) | 头像url |  |
| content | varchar(1024) | 内容 |  |
| topic | int(32) | 讨论的主题 | 0 |
| index | int(32) | 主题下的index | 0 |


##### &#160; &#160; &#160; &#160; 2.9 用户表(user)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| name | varchar(128) | 用户名 |  |
| password | varchar(128) | MD5 的密码值 |  |
| role | int(32) | 角色 0:管理员,1:用户  | 1 |
| avatar | varchar(1024) | 头像图片url |  |


##### &#160; &#160; &#160; &#160; 2.10 书籍表(book)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_end | timestamp | 结束时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| name | varchar(1024) | 书籍名称 |  |
| author | varchar(1024) | 作者名称 |  |
| classification | bigint(128) | classification 的主键id | 0 |
| count | int(32) | 总页数 | 1 |
| current | int(32) | 当前阅读页数 | 0 |
| score | decimal(3,1) | 豆瓣评分 | 0.0 |
| img | varchar(1024) | 封面图片url |  |


##### &#160; &#160; &#160; &#160; 2.11 收藏夹表(bookmark)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| classification | bigint(128) | classification 的主键id | 0 |
| title | varchar(1024) | 文章标题 |  |
| desc | text | 描述 |  |
| url | varchar(1024) | 访问链接 |  |


##### &#160; &#160; &#160; &#160; 2.12 生词表(foreign_word)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| foreign_article | bigint(128) | 文章id | 0 |
| word | varchar(1024) | 词语 |  |


##### &#160; &#160; &#160; &#160; 2.13 热词表(keyword)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| name | varchar(1024) | 名称 |  |
| desc | text | 描述 |  |
| url | varchar(1024) | 访问链接 |  |


##### &#160; &#160; &#160; &#160; 2.14 笔记表(note)
| 字段名称 | 数据类型   | 说明 | 默认值 |
| :-: | :-: | :-: | :-: |
| id | bigint(128) | 唯一主键 |  |
| gmt_create | timestamp | 创建时间 | CURRENT_TIMESTAMP |
| gmt_modified | timestamp | 更新时间 | CURRENT_TIMESTAMP |
| book | bigint(128) | 书籍的唯一主键 | 0 |
| total | int(32) | 总页数 | 0 |
| current | int(32) | 当前阅读进度 | 0 |
| url | varchar(1024) | 笔记链接 |  |


#### 3. 接口设计

见前端菜单swagger
#### 4. 构建部署
执行以下命令启动
`
nohup yarn run dev &
`

A GinBro RESTful APIs

## Recommend Go version > 1.12
- for Chinese users: set env GOPROXY=https://goproxy.io
- run: go tidy

## Usage
- [swagger DOC ](http://127.0.0.1:7001/doc)`http://127.0.0.1:7001/swagger/`
- [static ](http://127.0.0.1:7001)`http://127.0.0.1:7001`
- [App INFO ](http://127.0.0.1:7001/App/info)`http://127.0.0.1:7001/App/info`
- API baseURL : `http://127.0.0.1:7001/api/v1`

## Info
- table'schema which has no "ID","id","ID" or "iD" will not generate model or route.
- the column which type is json value must be a string which is able to decode to a JSON,when call POST or PATCH.
## Thanks
- [swagger Specification](https://swagger.io/specification/)
- [gin-gonic/gin](https://github.com/gin-gonic/gin)
- [GORM](http://gorm.io/)
- [viper](https://github.com/spf13/viper)
- [cobra](https://github.com/spf13/cobra#getting-started)
- [go-redis](https://go get github.com/go-redis/redis)
