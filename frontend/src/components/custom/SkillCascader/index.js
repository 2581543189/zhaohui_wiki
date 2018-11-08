import React, { Component} from 'react';
import {
    Cascader,
} from 'antd';
import {distinctValue} from '@/services/data';
import {openNotification} from '../../../utils/utils';
import { __await } from 'tslib';


class SkillCascader extends Component {
    //构造方法
    constructor(){
        super();
        this.state={
            options:[],//数据源
        }
    }

    //如果有设置初始值，需要获取初始值对应的数据
    async componentWillMount(){

        await this.loadData([]);
        const data = this.props.initdata;
        console.log(data);
        if(data){
            await this.loadData([
                {value:data.first}
            ]);
            await this.loadData([
                {value:data.first},
                {value:data.second}
            ]);
        }
    }

    //加载数据方法.
    async loadData(selectedOptions){
        //转化入参
        console.log(selectedOptions);
        let deepth = selectedOptions.length;
        let param={};
        if(deepth==3){

        }else if(deepth==2){
            param={
                name:'third',
                first:selectedOptions[0].value,
                second:selectedOptions[1].value,
            }

        }else if(deepth==1){
            param={
                name:'second',
                first:selectedOptions[0].value,
            }

        }else{
            param={
                name:'first',
            }
        }
        //请求后端获取数据
        
        try{
            let response = await distinctValue(param);
            if(response.error!=1){
                //设置新状态
                this.addOptions(response.body);
            }else{
                openNotification('error',response.message);
            }
    
        }catch(e){
            console.log(e);
            openNotification('error','发生异常，请查看控制台');
        }
    }

    //处理返回数据
    addOptions(data){
        const response = data;
        let oldOptions=this.state.options;
        if(typeof(response.first)=='undefined' ||response.first===null){
            //无条件
            let options = [];
            response.array.map(data=>{
                options.unshift({
                    value: data,
                    label: data,
                    isLeaf: false,
                })
            })
            oldOptions = options;

        }else{
            let children=[];
            const first = response.first;

            if(typeof(response.second)=='undefined' ||response.second===null){ 
                //根据1 查2
                response.array.map(data=>{
                    children.unshift({
                        label: data,
                        value: data,
                        isLeaf: false,
                    })
                })
                oldOptions.map(data=>{
                    if(data.value===first){
                        data.children = children;
                    }
                })

            }else{
                //根据1 2 查3
                const second = response.second;
                response.array.map(data=>{
                    children.unshift({
                        label: data,
                        value: data,
                    })
                })
                oldOptions.map(data=>{
                    if(data.value===first){
                        data.children.map(data2=>{
                            if(data2.value===second){
                                data2.children = children;
                            }
                        })
                    }
                })
            }
        }

        //更新ui
        this.setState({
            options:oldOptions
        });
    }
    render(){

        const {options} = this.state;

        return (
            <Cascader
            options={options}
            loadData={(selectedOptions)=>this.loadData(selectedOptions)}
            //onChange={(value, selectedOptions)=>this.onChange(value, selectedOptions)}
            changeOnSelect
            {...this.props}
        />
        )
    }
}

export default SkillCascader;