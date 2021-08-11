/*
  @author Alexia LEGUEDOIS
*/
// React
import React, { Component } from 'react';
// import moment from 'moment';
// Style
import {Row, Col, Button, Descriptions} from 'antd';
// Tools 
import B from '../Tools/back';

export default class Bookings extends Component {

  state = {
  }

  get_doctor (idDoc) {
    fetch(`https://tech-test.joovence.dev/api/doctors`,{headers:{'content-type':'application/json', Accept:'application/json'}})
    .then(rep => rep.json())
    .then (rep => {
        let dc = rep.filter(e => e.id === idDoc)
        //no data
        console.log(dc)
    })
    .catch( err => {
        console.log('get_doctors', err);
    });
}

  componentDidMount () {
    const { idDoc } = this.props.match.params;
    this.get_doctor(idDoc)
  }

  removeAvl (date,doctorid) {
    // console.log(date,doctorid)
    // const options = { method: 'POST', headers: { 'Content-Type': 'application/json' } }
    // fetch('https://tech-test.joovence.dev/api/bookings', { ...options, body: JSON.stringify({date: date,doctorId: doctorid }) })
    // .then( rep => rep.json() )
    // .then(rep => console.log(rep))
    B.notification("info",<div>Your request was successfully submitted<p>vous allez etre redirige vers l'accueil</p></div>)
    setTimeout(()=> { window.location.replace("/") }, 3000)  
  }

  cancelAvl () {
    B.notification('error',<div>Cancelling, your request was successfully submitted<p>vous allez etre redirige vers l'accueil</p></div>,4.5)
    setTimeout(()=> { window.location.replace("/") }, 3000)
  }


  render() {
    const { avl, idDoc } = this.props.match.params;
    const avl_res = new Date(Number(avl))
    return (
        <div>
          {B.Header()}
          <Row type="flex" justify="center" style={{marginTop:'80px'}}>
              <Col xs={22} sm={20} md={20} lg={20} xl={22}>
                  <Row>
                  <Descriptions title="Validation">
                    <Descriptions.Item label="Patient">John Doe</Descriptions.Item>
                    <Descriptions.Item label="Date and hours">{avl_res.toString()}</Descriptions.Item>
                    <Descriptions.Item label="Medecin">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Code Medecin">{idDoc}</Descriptions.Item>
                    <Descriptions.Item label="Address">
                      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>                  
                  </Descriptions>                
                  </Row>
                  <Row>
                      Finished your appointement by clicking on "Continue"
                  </Row>
                    {B.popConfirm("top",<div>Do you really want valid this appointement </div>,()=> this.removeAvl("date","doctorid"),
                      ()=> this.cancelAvl(), <Button style={{margin:'20px 0'}} type="primary">Continue</Button>)} 
                  
              </Col>
          </Row>
        </div>
    );
  }
}
