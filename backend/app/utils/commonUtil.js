module.exports = {

    //const util = {};

    // //处理sorter
    // util.dealSorter = function (query, sorter) {
    //     const array = sorter.split('_');
    //     const key = array[0];
    //     const type = array[1] == 'descend' ? 'desc' : 'asc';
    //     query.order = [
    //         [key, type]
    //     ];
    // }

    // //处理like
    // util.dealKeyLike = function (query, key, value) {
    //     if (typeof (query.where) == 'undefined') {
    //         query.where = {};
    //     }
    //     query.where.key = {
    //         $like: '%' + value + '%'
    //     }
    // }

    // //处理equal
    // util.dealKeyEqual = function (query, key, value) {
    //     if (typeof (query.where) == 'undefined') {
    //         query.where = {};
    //     }
    //     query.where.key = value;
    // }



    // return util;


    //处理sorter
    dealSorter(query, sorter) {
        const array = sorter.split('_');
        const key = array[0];
        const type = array[1] == 'descend' ? 'desc' : 'asc';
        query.order = [
            [key, type]
        ];
    },

    //处理like
    dealKeyLike(query, key, value) {
        if (typeof (query.where) == 'undefined') {
            query.where = {};
        }
        query.where[key] = {
            $like: '%' + value + '%'
        }
    },

    //处理equal
    dealKeyEqual(query, key, value) {
        if (typeof (query.where) == 'undefined') {
            query.where = {};
        }
        query.where[key] = value;
    },
}