import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import SampleImage from '../assets/images/sample-image.webp';
import Container from '../components/Container';

const MyBookingContainer = styled.div`
  padding: 20px 0px;
`;

const TitleText = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const HostelImage = styled.div`
  width: 100%;
  height: 150px;
  background-image: url(${SampleImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
`;

const BookingContainer = styled.div`
  padding: 0px 20px;
`;

const CityText = styled.div`
  font-size: 14px;
  color: #a4a4a4;
  margin-bottom: 8px;
`;

const HostelText = styled.div`
  width: 250px;
  font-size: 16px;
  color: #222222;
  padding: 2.5px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

const DetailText = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

class MyBooking extends Component {
  render() {
    return (
      <Container>
        <MyBookingContainer>
          <TitleText>My Booking</TitleText>
          <Row gutter={[16, 32]}>
            <Col span={12}>
              <Row>
                <Col span={8}><HostelImage /></Col>
                <Col span={16}>
                  <BookingContainer>
                    <CityText>Thailand</CityText>
                    <HostelText>180° VIEW, PRIVATE POOL VILLA..</HostelText>
                    <DetailText>
                      Checkin:&nbsp;
                      <b>2020-02-05</b>
                    </DetailText>
                    <DetailText>
                      Checkout:&nbsp;
                      <b>2020-02-10</b>
                    </DetailText>
                    <DetailText>
                      Guests:&nbsp;
                      <b>5</b>
                    </DetailText>
                  </BookingContainer>
                </Col>
              </Row>
            </Col>
          </Row>
        </MyBookingContainer>
      </Container>
    );
  }
}

export default MyBooking;
