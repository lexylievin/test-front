/*
  @author Alexia LEGUEDOIS
*/
// React
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
// Style
import { Row,Col, Button } from 'antd';
// Tools 
import B from '../Tools/back';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        {B.Header()}
        <Row type="flex" justify="center" style={{marginTop:'80px'}}>
          <Col xs={22} sm={20} md={20} lg={20} xl={22}>
            {B.notificationResult("404","Sorry, the page you visited does not exist.",<Button type="primary"><Link to={'/'}>Back Home</Link></Button>,"404")}
          </Col>
        </Row>
      </div>
    );
  }
}

