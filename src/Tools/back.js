/*
  @author Alexia LEGUEDOIS
*/
// React
import React from 'react';
import {Link} from 'react-router-dom';
// Components
import Header from '../pages/Header';
import NotFound from '../pages/NotFound';
// Ressources
// Style
import { notification, Result, Tag, Tooltip, Button, Popconfirm } from 'antd';

const B = {
  getH: new Date().getHours(),
  getM: new Date().getMonth(),
  getY: new Date().getFullYear(),
  year: String(new Date().getFullYear()).slice(2),

  
  getTime: date => new Date(date).getTime(),

  capitalizeFirstLetter : (txt) => {
    const str = txt.split(" ")
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ")
  }, 

  appendLeadingZeroes: n => n <= 9 ? "0" + n : n,
  
  notification: (type, message, duration) => notification[type]({
      placement: 'bottomRight',
      message: 'Notification',
      description: message,
      duration: duration
    }),

  notificationResult: (title,subtitle,extra,status) => 
    <Result
      status={status}
      title={title}
      subTitle={subtitle}
      extra={extra}
    />,

    popConfirm: (placement,title,onConfirm,onCancel,content) => {
      return (
        <Popconfirm
            placement={placement}
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
        >
            {content}
        </Popconfirm>
      )
    },
  

  btn_link: (title,link,obj) => <Button style={{background:"#ee727f",color:"#fff",margin: obj ? "5px" : "30px 0px",float: obj ? 'left' : 'none'}}><Link to={link}>{title}</Link></Button>,

  tag: (key,color,tagName,link) => link ?
    <Tag color={color} style={{margin:'5px'}} key={'tag'+key}><Link to={link}>{tagName}</Link></Tag>
    :
    <Tag color={color} style={{margin:'5px'}} key={'tag'+key}>{tagName}</Tag>,

  tooltip: (placement,title,content) => <Tooltip placement={placement} title={title}>{content}</Tooltip>,

  formatDate: date => {
      let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
      const d = new Date(date)
      return isNaN(d) ? '' : d.getDate()+'-'+month[d.getMonth()]+'-'+d.getFullYear().toString().slice(2,4)
  },

  getFullTime : date => new Date(date).toLocaleString(),

  Header: () => <Header/>,
  NotFound: () => <NotFound/>
}

export default B;