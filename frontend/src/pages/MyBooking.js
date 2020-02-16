/* eslint-disable import/no-extraneous-dependencies, react/forbid-prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Empty, Row } from 'antd';
import moment from 'moment';

import NextIcon from '../assets/icons/chevron-right-regular.svg';
import PreviousIcon from '../assets/icons/chevron-left-regular.svg';
import Container from '../components/Container';
import { ClientContext } from '../contexts/ClientContext';
import { getMyBooking } from '../services/me';

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
  background-image: url(${({ src }) => src});
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

const PagingContainer = styled.div`
  padding: 30px 0px;
`;

const PreviousContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  cursor: pointer;
  padding-right: 50px;
`;

const PreviousIconContainer = styled.div`
  padding: 10px 18px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #d9d9d9;

  :hover {
    border: 1px solid #b1b1b1;
  }
`;

const Previous = styled.img`
  width: 10px;
`;

const NextContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 50px;
`;

const NextIconContainer = styled.div`
  padding: 10px 18px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #d9d9d9;

  :hover {
    border: 1px solid #b1b1b1;
  }
`;

const Next = styled.img`
  width: 10px;
`;

class MyBooking extends Component {
  state = {
    bookings: [],
    nextLink: '',
    prevLink: ''
  };

  async componentDidMount() {
    const { history } = this.props;
    const client = this.context;

    await this.getMyBooking(client.token);

    this.unlisten = history.listen(async () => {
      await this.setState({ bookings: [] });
      await this.getMyBooking(client.token);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getMyBooking = async token => {
    await getMyBooking(token)
      .then(({ data }) => this.setState({ bookings: data.bookings }))
      .catch(() => {
        this.setState({ bookings: [] });
      });
  };

  render() {
    const { bookings, nextLink, prevLink } = this.state;

    return (
      <Container>
        <MyBookingContainer>
          <TitleText>My Booking</TitleText>
          {bookings.length > 0 ? (
            <Row gutter={[16, 32]}>
              {bookings.map(booking => (
                <Col lg={12} key={booking.id}>
                  <Row>
                    <Col span={8}>
                      <HostelImage src={booking.hostel.images[0]} />
                    </Col>
                    <Col span={16}>
                      <BookingContainer>
                        <CityText>{booking.hostel.location.city}</CityText>
                        <HostelText>{booking.hostel.name}</HostelText>
                        <DetailText>
                          Checkin:&nbsp;
                          <b>{moment(booking.check_in).format('YYYY-MM-DD')}</b>
                        </DetailText>
                        <DetailText>
                          Checkout:&nbsp;
                          <b>
                            {moment(booking.check_out).format('YYYY-MM-DD')}
                          </b>
                        </DetailText>
                        <DetailText>
                          Guests:&nbsp;
                          <b>{booking.guests}</b>
                        </DetailText>
                      </BookingContainer>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </MyBookingContainer>
        <PagingContainer>
          <Row type="flex">
            <Col span={12}>
              {prevLink && (
                <PreviousContainer>
                  <PreviousIconContainer onClick={this.handlePrevious}>
                    <Previous src={PreviousIcon} />
                  </PreviousIconContainer>
                </PreviousContainer>
              )}
            </Col>
            <Col span={12}>
              {nextLink && (
                <NextContainer>
                  <NextIconContainer onClick={this.handleNext}>
                    <Next src={NextIcon} />
                  </NextIconContainer>
                </NextContainer>
              )}
            </Col>
          </Row>
        </PagingContainer>
      </Container>
    );
  }
}

MyBooking.contextType = ClientContext;
MyBooking.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(MyBooking);
