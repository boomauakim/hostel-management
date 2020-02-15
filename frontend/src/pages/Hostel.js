import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Carousel, Col, DatePicker, InputNumber, Row } from 'antd';
import GoogleMapReact from 'google-map-react';

import ElevatorIcon from '../assets/icons/sort-circle-light.svg';
import KitchenIcon from '../assets/icons/hat-chef-light.svg';
import NextIcon from '../assets/icons/chevron-right-regular.svg';
import ParkingIcon from '../assets/icons/parking-circle-light.svg';
import PoolIcon from '../assets/icons/swimming-pool-light.svg';
import PreviousIcon from '../assets/icons/chevron-left-regular.svg';
import TvIcon from '../assets/icons/tv-light.svg';
import WifiIcon from '../assets/icons/wifi-light.svg';
import SampleImage from '../assets/images/sample-image.webp';
import Container from '../components/Container';

const { RangePicker } = DatePicker;

const HostelContainer = styled.div`
  padding: 20px 0px;
`;

const HostelImage = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${SampleImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
`;

const PreviousContainer = styled.div`
  position: absolute;
  height: 500px;
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
`;

const PreviousIconContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  margin-left: 10px;
  padding: 10px 18px;
  border-radius: 50%;
`;

const Previous = styled.img`
  width: 15px;
`;

const NextContainer = styled.div`
  position: absolute;
  right: 0;
  height: 500px;
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
`;

const NextIconContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  margin-right: 10px;
  padding: 10px 18px;
  border-radius: 50%;
`;

const Next = styled.img`
  width: 15px;
`;

const HostelNameText = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 20px 0px 0px 0px;
`;

const SectionText = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const HostelDesc = styled.div`
  text-align: justify;
`;

const AmenitiesItem = styled.div`
  padding: 15px 0px;
  display: flex;
  align-items: center;
`;

const AmenitiesIcon = styled.img`
  width: 20px;
`;

const AmenitiesText = styled.span`
  margin-left: 15px;
`;

const GoogleMapContainer = styled.div`
  height: 300px;
`;

const BookingContainer = styled.div`
  margin: 0px 40px;
  padding: 20px;
  border: 1px solid #e4e4e4;
  position: fixed;
  top: 90px;
`;

const PriceText = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

const Hr = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin: ${({ margin }) => `${margin}px`} 0px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;

  .ant-input-number {
    width: 100%;
  }
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 3px;
`;

class Hostel extends Component {
  handleNext = () => {
    this.carousel.next();
  };

  handlePrevious = () => {
    this.carousel.prev();
  };

  render() {
    return (
      <Container>
        <HostelContainer>
          <Row>
            <Col span={14}>
              <PreviousContainer onClick={this.handlePrevious}>
                <PreviousIconContainer>
                  <Previous src={PreviousIcon} />
                </PreviousIconContainer>
              </PreviousContainer>
              <NextContainer onClick={this.handleNext}>
                <NextIconContainer>
                  <Next src={NextIcon} />
                </NextIconContainer>
              </NextContainer>
              <Carousel
                ref={c => {
                  this.carousel = c;
                }}
              >
                <HostelImage />
                <HostelImage />
              </Carousel>
              <HostelNameText>180° VIEW, PRIVATE POOL VILLA..</HostelNameText>
              <div>Thailand</div>
              <Hr margin={25} />
              <HostelDesc>
                Brand new luxury villa in North Bali with stunning uninterrupted
                sea views. Completed in 2015,
                <br />
                <br />
                We have 3 almost identical listings, so please check out the
                other 2 in case this one is booked.
                <br />
                <br />
                https://www.airbnb.com/manage-listing/5155854 and
                https://www.airbnb.com/manage-listing/1873760
                <br />
                <br />
                Villa Sanglung, which is surrounded by nature with stunning,
                uninterrupted ocean views is the perfect place to relax and
                enjoy cooling breezes from its elevated position. This is Bali
                from 25 years ago.
                <br />
                <br />
                The villa has 2 large bedrooms both with en-suite bathrooms and
                the master en-suite includes a bathtub.
                <br />
                <br />
                An open concept living area including kitchen and third fully
                equipped bathroom, leads out to an open air living / dining area
                and terrace.
                <br />
                <br />
                Upstairs there is a lovely open plan very versatile living space
                with timber floors, and more incredible views.
                <br />
                <br />
                An infinity pool completes the outdoor space where you can relax
                whilst enjoying the full view toward Singaraja the sea and
                beyond.
                <br />
                <br />
                The villa sleeps up to 8 guests and provides staff and night
                security.
                <br />
                <br />
                The villa has been designed for those who want to relax and
                enjoy the peace and quite of Bali from 25 years ago with the
                convenience of being located not far from the beach and
                Singaraja.
              </HostelDesc>
              <Hr margin={25} />
              <SectionText>Amenities</SectionText>
              <Row type="flex" align="middle">
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={WifiIcon} alt="wifi-icon" />
                    <AmenitiesText>Wifi</AmenitiesText>
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={TvIcon} alt="tv-icon" />
                    <AmenitiesText>TV</AmenitiesText>
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={PoolIcon} alt="tv-icon" />
                    <AmenitiesText>Pool</AmenitiesText>
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={KitchenIcon} alt="tv-icon" />
                    <AmenitiesText>Kitchen</AmenitiesText>
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={ElevatorIcon} alt="tv-icon" />
                    <AmenitiesText>Elevator</AmenitiesText>
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={ParkingIcon} alt="tv-icon" />
                    <AmenitiesText>Parking</AmenitiesText>
                  </AmenitiesItem>
                </Col>
              </Row>
              <Hr margin={25} />
              <SectionText>Location</SectionText>
              <GoogleMapContainer>
                <GoogleMapReact />
              </GoogleMapContainer>
            </Col>
            <Col span={10}>
              <BookingContainer>
                <div>
                  <PriceText>฿5,555</PriceText>
                  &nbsp;per&nbsp;night
                </div>
                <Hr margin={15} />
                <InputContainer>
                  <Label>Dates</Label>
                  <RangePicker
                    size="large"
                    suffixIcon={<></>}
                    allowClear={false}
                    placeholder={['Checkin', 'Checkout']}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Guests</Label>
                  <InputNumber
                    size="large"
                    min={1}
                    max={12}
                    placeholder="Guest"
                  />
                </InputContainer>
                <Button block type="primary" size="large">
                  <b>Reserve</b>
                </Button>
              </BookingContainer>
            </Col>
          </Row>
        </HostelContainer>
      </Container>
    );
  }
}

export default Hostel;
