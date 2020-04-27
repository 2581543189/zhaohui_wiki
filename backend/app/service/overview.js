'use strict';

const Service = require('egg').Service;

class Overview extends Service {
    async getCount(name) {
        let ctx = this.ctx;
        let totalCount = 0;
        let finishCount = 0;
        //获取技能id
        let query = {
            where :{
                $or:[{
                    first:{
                        $like: '%'+name+'%'
                    }
                },{
                    second:{
                        $like: '%'+name+'%'
                    }
                },{
                    third:{
                        $like: '%'+name+'%'
                    }
                }]
            }
        };
        let skills = await ctx.service.skill.query(query);
        let skillIds = [];
        skills.rows.forEach((x)=>{
            skillIds.push(x.id);
        });
        //获取技能相关书籍
        query = {
            where :{
                skill:{
                    $in: skillIds
                }
            }
        };
        let books = await ctx.service.book.query(query);
        totalCount += books.count;
        //获取看完的书籍
        query = {
            where :{
                $and:[{
                    skill:{
                        $in: skillIds
                    }
                },{
                    endDate:{ $ne: null} 
                }]
            }
        };
        finishCount+= await ctx.service.book.count(query);
        //获取读书笔记
        let bookIds = [];
        books.rows.forEach((x)=>{
            bookIds.push(x.id);
        });
        //书籍中属于数学的书籍
        query = {
            where :{
                book:{
                    $in: bookIds
                }
            }
        };
        let noteCount = await ctx.service.note.count(query);
        totalCount += noteCount;
        finishCount+= noteCount;
        //发表文章数量
        query = {
            where :{
                skill:{
                    $in: skillIds
                }
            }
        };
        let articleCount = await ctx.service.article.count(query);
        totalCount += articleCount;
        finishCount+= articleCount;
        //任务
        query = {
            where :{
                sketch:{
                    $like: '%['+name+']%'
                }
            }
        };
        totalCount += await ctx.service.bulletin.count(query);
        query= {
            where :{
                $and:[{
                    sketch:{
                        $like: '%['+name+']%'
                    }
                },{
                    endDate:{ $ne: null} 
                }]
            }
        };
        finishCount += await ctx.service.bulletin.count(query);

        return　{
            totalCount:totalCount,
            finishCount:finishCount
        }
    }
}
module.exports = Overview;