/*
  @author Alexia LEGUEDOIS
*/
// React
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// Style
import '../css/header.css';
import { Avatar, Col, Row } from 'antd';
// Tools 
// import B from '../Tools/back';

export default class Header extends Component {
  render() {
    return (
        <div>       
            <Row id="header">
              <Col span={23}>
                <Link to={'/'} replace>
                  <img style={{verticalAlign:'middle'}} src="/joovence-logo.png" width="200" alt="logo" />
                  <span style={{verticalAlign:'middle', fontSize:'medium'}}> | Bookings</span> 
                </Link>
              </Col>
              <Col span={1}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="" />
              </Col>
            </Row>
        </div>
    );
  }
}
