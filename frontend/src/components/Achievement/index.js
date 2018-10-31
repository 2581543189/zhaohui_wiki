import React from "react";
import styles from './index.less';
import {
    Card,
    Icon,
    Divider,
    Rate,
    Popover,
    Progress,
} from 'antd';
import { connect } from 'dva';
import {bulletinLevelClass} from '../../constant/DataConstant'
const colorArray=['#32CD32','#4B69FF','#D32CE6','#8847FF','red'];
class Achievement extends React.PureComponent {

    

    render(){
        const{level,desc,icon}=this.props;
        const color = colorArray[level];
        const chengjiuDesc = (
            <div style={{width:'200px'}}>
              <Divider orientation="left">成就说明</Divider>
              <p style={{textAlign: 'center'}}>{desc.now}</p>
              <Divider orientation="left">下一等级</Divider>
              <p style={{textAlign: 'center'}}>{desc.next}</p>
              <Divider orientation="left">进度</Divider>
              <p style={{textAlign: 'center'}}><Progress percent={desc.current*100/desc.total} size="small" />{desc.current}/{desc.total}</p>
            </div>
        );

        return(
        <div className={styles.extraContent} style={{boxShadow:'5px 2px 6px #aaa'}}>
            <Popover placement="bottom" content={chengjiuDesc} trigger="hover" >
                <Card 
                    style={{width:'105px',height:'105px',border:'2px solid '+color}}
                    cover={<Icon type={icon} theme="twoTone" twoToneColor={color} style={{fontSize:'50px',padding:'10px',marginLeft:'20px'}}/>}
                    bodyStyle={{padding:'0px',display:'flex'}}
                >
                    <Rate 
                        disabled 
                        defaultValue={level+1}  
                        character={<Icon type="star" theme="filled" style={{fontSize:'10px',margin:'0px'}}/>} 
                        style={{color:color,marginLeft:'1px',marginTop: '-10px'}}
                    />
                    <span className={styles.achievementText} style={{color:color}} >{desc.hanzi}</span>
                </Card>
            </Popover>

        </div>
        )
    }
}
export default connect(state => {
    return {};
  })(Achievement);