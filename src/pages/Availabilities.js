/*
  @author Alexia LEGUEDOIS
*/
// React
import React, { Component } from 'react';
import moment from 'moment';
import BookingCalendar from 'react-booking-calendar';
// Style
import {Row, Col, List, Avatar, Input} from 'antd';
import { FaMapPin } from 'react-icons/fa';
import '../css/availabilities.css'
// Tools 
import B from '../Tools/back';
//Ressources

const {Search}= Input;

export default class Availabilities extends Component {
    
    state = {
        doct:[], 
        oldDoctors: [], 
        loading: false, 
        searchString: '',
        doc_avl:[], 
        next_avl: '', 
        value: moment(new Date()),
        selectedValue: ''
    };

    get_doctor (doc) {
        fetch(`https://tech-test.joovence.dev/api/availabilities?doctorId=${doc.id}`,{headers:{'content-type':'application/json', Accept:'application/json'}})
        .then(rep => rep.json())
        .then (rep => {
            let byDate = [].concat.apply([], rep.map(item => new Date(item.start))).sort()
            this.setState({
                doct: [...this.state.doct, { key: doc.id, name:doc.name,address: doc.address.line1,doc_avl: byDate, allDisp: doc.name+doc.address.line1}],
                oldDoctors:[...this.state.oldDoctors, { key: doc.id,name:doc.name,address: doc.address.line1,doc_avl: byDate, allDisp: doc.name+doc.address.line1}]
            })
            console.log(byDate)
        })
        .catch( err => {
            console.log('get_doctor', err);
        });	
    }
    

get_doctors () {
    fetch(`https://tech-test.joovence.dev/api/doctors`,{headers:{'content-type':'application/json', Accept:'application/json'}})
    .then(rep => rep.json())
    .then (rep => {
        for(let y =0; y < rep.length; y++){
            this.get_doctor(rep[y])
        }
    })
    .catch( err => {
        console.log('get_doctors', err);
    });	
}

componentDidMount() {		
    this.get_doctors()
    const {searchString} = this.props.match.params;
    if (searchString) 
        this.setState({searchString: searchString})
}

onchangesearchParam(value) {
    this.setState({doct: value ?
        value.split(' ').reduce( (rst, word) => rst.filter( d => d.allDisp.toLowerCase().match(word.toLowerCase()) ),
          this.state.oldDoctors )
    :  this.state.oldDoctors});
  }

  render() {
    const {doct} = this.state;
    // console.log(doct)

    return (
        <div>
            {B.Header()}
            <Row type="flex" justify="center" style={{marginTop:'80px'}}>
                <Col xs={22} sm={20} md={20} lg={20} xl={22}>
                    <Search
                        placeholder="Search an orthodontist by: name, address."
                        onChange={value => { 
                        this.onchangesearchParam(value.target.value) 
                        this.setState({searchString: value.target.value})
                        window.history.replaceState({}, '', '/availabilities/'+ value.target.value);
                        }}
                        allowClear={true}
                        size='large'
                        defaultValue={this.state.searchString}
                    />
                    <p>{doct.length} Result(s)</p>
                    {doct && <List
                    itemLayout="horizontal"
                    dataSource={doct}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="" />
                            }
                            title={<div>{item.name}<p><FaMapPin /> {item.address}</p></div>}
                            description={<div>
                            <BookingCalendar bookings={item.doc_avl} />
                            </div>}
                        />
                            <div>
                                {B.btn_link(`Next appointement available on: ${B.getFullTime(item.doc_avl.slice(0,1))}`,'/'+item.key+'/'+B.getTime(item.doc_avl.slice(0,1))+'/bookings')}
                                {item.doc_avl.slice(1,item.doc_avl.length).map((item,index)=> {
                                    return <div key={index}>{B.btn_link(`${B.getFullTime(item)}`,'/'+item.key+'/'+B.getTime(item)+'/bookings',true)}</div>
                                })}
                            </div>

                    </List.Item>
                    )}
                    />}
                </Col>
            </Row>
        </div>
    );
  }
}
