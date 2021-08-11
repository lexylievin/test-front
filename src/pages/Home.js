/*
  @author Alexia LEGUEDOIS
*/
// React
import React, { Component } from 'react';
import renderHTML from 'react-render-html';
// Style
import {Descriptions,Col,Row} from 'antd';
import '../css/home.css';
// Tools 
import B from '../Tools/back';
//Ressources
import D from '../Resources/data.json';

export default class Home extends Component {
  render() {

    return (
        <div>
        {B.Header()}
        <Row type="flex" justify="center" style={{marginTop:'80px'}}>
            <Col xs={22} sm={20} md={20} lg={20} xl={22}>
                <Descriptions bordered> 
                    <Descriptions.Item label={<img src={`${process.env.PUBLIC_URL}/img/ent.jpg`} width="200" alt=''/>}>
                    <Col span={18}>
                    {renderHTML(D.description_acc)}
                    {B.btn_link("Prendre RDV","/availabilities")}
                    </Col>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
        </div>
    );
  }
}
