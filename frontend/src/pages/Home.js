import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import SampleImage from '../assets/images/sample-image.webp';
import Container from '../components/Container';
import LoginModal from '../components/LoginModal';

const HomeContainer = styled.div`
  padding: 20px 0px;
`;

const HostelContainer = styled.div`
  cursor: pointer;
`;

const HostelImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${SampleImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
`;

const CityText = styled.div`
  font-size: 14px;
  color: #a4a4a4;
  padding: 10px 0px 2.5px 0px;
`;

const HostelText = styled.div`
  width: 230px;
  font-size: 16px;
  color: #222222;
  padding: 2.5px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HostelPriceText = styled.span`
  font-size: 16px;
  color: #222222;
`;

class Home extends Component {
  render() {
    return (
      <Container>
        <HomeContainer>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <HostelContainer>
                <HostelImage />
                <CityText>Bangkok</CityText>
                <HostelText>180° VIEW, PRIVATE POOL VILLA VILLA VILLA</HostelText>
                <HostelPriceText>
                  <b>฿5,555</b>
                &nbsp;/ night
                </HostelPriceText>
              </HostelContainer>
            </Col>
            <Col span={6}>
              <HostelContainer>
                <HostelImage />
                <CityText>Bangkok</CityText>
                <HostelText>180° VIEW, PRIVATE POOL VILLA VILLA VILLA</HostelText>
                <HostelPriceText>
                  <b>฿5,555</b>
                &nbsp;/ night
                </HostelPriceText>
              </HostelContainer>
            </Col>
            <Col span={6}>
              <HostelContainer>
                <HostelImage />
                <CityText>Bangkok</CityText>
                <HostelText>180° VIEW, PRIVATE POOL VILLA VILLA VILLA</HostelText>
                <HostelPriceText>
                  <b>฿5,555</b>
                &nbsp;/ night
                </HostelPriceText>
              </HostelContainer>
            </Col>
            <Col span={6}>
              <HostelContainer>
                <HostelImage />
                <CityText>Bangkok</CityText>
                <HostelText>180° VIEW, PRIVATE POOL VILLA VILLA VILLA</HostelText>
                <HostelPriceText>
                  <b>฿5,555</b>
                &nbsp;/ night
                </HostelPriceText>
              </HostelContainer>
            </Col>
          </Row>
        </HomeContainer>
      </Container>
    );
  }
}

export default Home;
