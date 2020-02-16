/* eslint-disable import/no-extraneous-dependencies, no-restricted-syntax, react/forbid-prop-types, react/no-array-index-key */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Alert,
  Button,
  Carousel,
  Col,
  DatePicker,
  InputNumber,
  Row
} from 'antd';
import GoogleMapReact from 'google-map-react';
import moment from 'moment';

import ElevatorIcon from '../assets/icons/sort-circle-light.svg';
import KitchenIcon from '../assets/icons/hat-chef-light.svg';
import MapMarker from '../assets/icons/map-marker-alt-solid.svg';
import NextIcon from '../assets/icons/chevron-right-regular.svg';
import ParkingIcon from '../assets/icons/parking-circle-light.svg';
import PoolIcon from '../assets/icons/swimming-pool-light.svg';
import PreviousIcon from '../assets/icons/chevron-left-regular.svg';
import TvIcon from '../assets/icons/tv-light.svg';
import WifiIcon from '../assets/icons/wifi-light.svg';
import { ClientContext } from '../contexts/ClientContext';
import Container from '../components/Container';
import { booking, bookingCalendar } from '../services/booking';
import { getHostelData } from '../services/hostels';

const { RangePicker } = DatePicker;

const HostelContainer = styled.div`
  padding: 20px 0px;
`;

const HostelImage = styled.div`
  width: 100%;
  height: 500px;
  background-image: url(${({ src }) => src});
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
  height: 400px;
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

const AlertContainer = styled.div`
  margin-bottom: 20px;
`;

class Hostel extends Component {
  state = {
    hostel: {},
    bookingCalendarList: {},
    checkin: '',
    checkout: '',
    guests: 1,
    error: '',
    success: false
  };

  async componentDidMount() {
    const { history } = this.props;

    await this.getHostelDetail();

    this.unlisten = history.listen(async () => {
      await this.setState({ hostel: {}, bookingCalendarList: {} });
      await this.getHostelDetail();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getHostelDetail = async () => {
    const { match } = this.props;
    const hostelId = match.params.id;
    await getHostelData(hostelId)
      .then(({ data }) => this.setState({ hostel: data.hostels }))
      .catch(() => {
        this.setState({ hostel: {} });
      });

    const payload = {
      hostelId,
      startAt: moment().format('YYYY-MM-DD'),
      endAt: moment()
        .add(12, 'month')
        .format('YYYY-MM-DD')
    };
    await bookingCalendar(payload).then(({ data }) => {
      const bookingCalendarList = {};

      for (const date of data.calendar) {
        bookingCalendarList[date.date] = date.available;
      }

      this.setState({ bookingCalendarList });
    });
  };

  handleNext = () => {
    this.carousel.next();
  };

  handlePrevious = () => {
    this.carousel.prev();
  };

  handleRangeDate = range => {
    this.setState({
      checkin: range[0].format('YYYY-MM-DD'),
      checkout: range[1].format('YYYY-MM-DD')
    });
  };

  handleBooking = async () => {
    const client = this.context;
    const { checkin, checkout, guests } = this.state;
    const { match } = this.props;
    const hostelId = match.params.id;
    let canBooking = true;

    if (!checkin && !checkout) {
      canBooking = false;
      await this.setState({ error: 'NOT_HAVE_DATE' });
    }
    if (!client.token) {
      canBooking = false;
      await this.setState({ error: 'NOT_LOGIN' });
    }

    if (canBooking) {
      const payload = {
        hostel_id: hostelId,
        check_in: checkin,
        check_out: checkout,
        guests
      };

      await booking(client.token, payload)
        .then(() => this.setState({ success: true, error: '' }))
        .catch(() => this.setState({ success: false, error: 'ERROR' }));
    }
  };

  disabledDate = current => {
    const { bookingCalendarList } = this.state;

    const bookingStatus =
      bookingCalendarList[moment(current).format('YYYY-MM-DD')] !== undefined
        ? bookingCalendarList[moment(current).format('YYYY-MM-DD')]
        : true;

    return current < moment().endOf('day') || !bookingStatus;
  };

  render() {
    const { hostel, guests, error, success } = this.state;

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
                {hostel.images &&
                  hostel.images.map((image, index) => (
                    <HostelImage src={image} key={`img-${index}`} />
                  ))}
              </Carousel>
              <HostelNameText>{hostel.name ?? ''}</HostelNameText>
              <div>{hostel.location?.city ?? ''}</div>
              <Hr margin={25} />
              <HostelDesc dangerouslySetInnerHTML={{ __html: hostel.about }} />
              <Hr margin={25} />
              <SectionText>Amenities</SectionText>
              <Row type="flex" align="middle">
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={WifiIcon} alt="wifi-icon" />
                    {hostel.amenities?.wifi ? (
                      <AmenitiesText>Wifi</AmenitiesText>
                    ) : (
                      <AmenitiesText>
                        <strike>Wifi</strike>
                      </AmenitiesText>
                    )}
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={TvIcon} alt="tv-icon" />
                    {hostel.amenities?.tv ? (
                      <AmenitiesText>TV</AmenitiesText>
                    ) : (
                      <AmenitiesText>
                        <strike>TV</strike>
                      </AmenitiesText>
                    )}
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={PoolIcon} alt="tv-icon" />
                    {hostel.amenities?.pool ? (
                      <AmenitiesText>Pool</AmenitiesText>
                    ) : (
                      <AmenitiesText>
                        <strike>Pool</strike>
                      </AmenitiesText>
                    )}
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={KitchenIcon} alt="tv-icon" />
                    {hostel.amenities?.kitchen ? (
                      <AmenitiesText>Kitchen</AmenitiesText>
                    ) : (
                      <AmenitiesText>
                        <strike>Kitchen</strike>
                      </AmenitiesText>
                    )}
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={ElevatorIcon} alt="tv-icon" />
                    {hostel.amenities?.elevator ? (
                      <AmenitiesText>Elevator</AmenitiesText>
                    ) : (
                      <AmenitiesText>
                        <strike>Elevator</strike>
                      </AmenitiesText>
                    )}
                  </AmenitiesItem>
                </Col>
                <Col span={12}>
                  <AmenitiesItem>
                    <AmenitiesIcon src={ParkingIcon} alt="tv-icon" />
                    {hostel.amenities?.parking ? (
                      <AmenitiesText>Parking</AmenitiesText>
                    ) : (
                      <AmenitiesText>
                        <strike>Parking</strike>
                      </AmenitiesText>
                    )}
                  </AmenitiesItem>
                </Col>
              </Row>
              <Hr margin={25} />
              <SectionText>Location</SectionText>
              <GoogleMapContainer>
                {hostel.location && (
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: process.env.REACT_APP_GOOGLE_MAP_KEY
                    }}
                    defaultCenter={[
                      hostel.location.gmap.lat,
                      hostel.location.gmap.lng
                    ]}
                    defaultZoom={11}
                  >
                    <img
                      src={MapMarker}
                      width="25px"
                      lat={hostel.location.gmap.lat}
                      lng={hostel.location.gmap.lng}
                      alt="map-marker-icon"
                    />
                  </GoogleMapReact>
                )}
              </GoogleMapContainer>
            </Col>
            <Col span={10}>
              <BookingContainer>
                {error === 'NOT_LOGIN' && (
                  <AlertContainer>
                    <Alert
                      message="Please login and continue."
                      type="error"
                      showIcon
                    />
                  </AlertContainer>
                )}
                {error === 'NOT_HAVE_DATE' && (
                  <AlertContainer>
                    <Alert
                      message="Please select checkin and checkout."
                      type="error"
                      showIcon
                    />
                  </AlertContainer>
                )}
                {error === 'ERROR' && (
                  <AlertContainer>
                    <Alert
                      message="Something went wrong, Please try again later."
                      type="error"
                      showIcon
                    />
                  </AlertContainer>
                )}
                {success && (
                  <AlertContainer>
                    <Alert
                      message="Success! Have a good trip :)"
                      type="success"
                      showIcon
                    />
                  </AlertContainer>
                )}
                <div>
                  <PriceText>
                    {`฿${Number(hostel.price).toLocaleString()}`}
                  </PriceText>
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
                    onChange={range => this.handleRangeDate(range)}
                    disabledDate={this.disabledDate}
                  />
                </InputContainer>
                <InputContainer>
                  <Label>Guests</Label>
                  <InputNumber
                    size="large"
                    min={1}
                    max={12}
                    defaultValue={1}
                    value={guests}
                  />
                </InputContainer>
                <Button
                  block
                  type="primary"
                  size="large"
                  onClick={this.handleBooking}
                >
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

Hostel.contextType = ClientContext;
Hostel.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Hostel);
