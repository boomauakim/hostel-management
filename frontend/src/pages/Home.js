/* eslint-disable import/no-extraneous-dependencies, react/forbid-prop-types */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, DatePicker, Row } from 'antd';

import NextIcon from '../assets/icons/chevron-right-regular.svg';
import PreviousIcon from '../assets/icons/chevron-left-regular.svg';
import Container from '../components/Container';
import {
  getAllHostels,
  getAllHostelsByLink,
  getAvailableHostel
} from '../services/hostels';

const { RangePicker } = DatePicker;

const HomeContainer = styled.div`
  margin-top: 45px;
  padding: 20px 0px;
`;

const HostelContainer = styled.div`
  cursor: pointer;
`;

const HostelImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({ src }) => src});
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

const FilterContainer = styled.div`
  position: fixed;
  top: 70px;
  height: 45px;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  padding-left: 80px;
  background-color: white;
`;

const FilterItemContainer = styled.div`
  border: 1px solid #b1b1b1;
  border-radius: 20px;
  margin: 0px 10px;

  .ant-input {
    border: none;
  }

  .ant-calendar-picker .ant-calendar-picker-input:not(.ant-input-disabled) {
    :hover {
      border: none;
    }
  }

  .ant-calendar-picker:focus
    .ant-calendar-picker-input:not(.ant-input-disabled) {
    border: none;
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

const FilterItem = styled.div`
  padding: 5px 15px;
  color: #484848;
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

class Home extends Component {
  state = {
    hostelList: [],
    nextLink: '',
    prevLink: ''
  };

  constructor(props) {
    super(props);
    this.getHostels();
  }

  getHostels = async () => {
    await getAllHostels()
      .then(async ({ data }) => {
        await this.serailizeData(data);
      })
      .catch(() => {
        this.setState({ hostelList: [] });
      });
  };

  handleHostelDetail = id => {
    const { history } = this.props;
    history.push(`/hostels/${id}`);
  };

  handlePrevious = async () => {
    const { prevLink } = this.state;
    await getAllHostelsByLink(prevLink)
      .then(async ({ data }) => {
        await this.serailizeData(data);
      })
      .catch(() => {
        this.setState({ hostelList: [] });
      });
  };

  handleNext = async () => {
    const { nextLink } = this.state;
    await getAllHostelsByLink(nextLink)
      .then(async ({ data }) => {
        await this.serailizeData(data);
      })
      .catch(() => {
        this.setState({ hostelList: [] });
      });
  };

  handleAvailableHostel = async range => {
    const startDate = range[0].format('YYYY-MM-DD');
    const endDate = range[1].format('YYYY-MM-DD');

    await getAvailableHostel(startDate, endDate)
      .then(async ({ data }) => {
        await this.serailizeData(data);
      })
      .catch(this.setState({ hostelList: [] }));
  };

  serailizeData = data => {
    const hostelList = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const hostel of data.hostels) {
      const hostelData = {
        id: hostel.id,
        name: hostel.name,
        image: hostel.images[0],
        price: hostel.price,
        city: hostel.location.city
      };
      hostelList.push(hostelData);
    }
    this.setState({
      hostelList,
      nextLink: data.paging.next ?? '',
      prevLink: data.paging.previous ?? ''
    });
  };

  render() {
    const { hostelList, nextLink, prevLink } = this.state;

    return (
      <>
        <FilterContainer>
          <FilterItemContainer>
            <FilterItem>
              <b>Available: </b>
              <RangePicker
                size="small"
                suffixIcon={<></>}
                allowClear={false}
                onChange={range => this.handleAvailableHostel(range)}
              />
            </FilterItem>
          </FilterItemContainer>
        </FilterContainer>
        <Container>
          <HomeContainer>
            <Row gutter={[16, 16]}>
              {hostelList.map(hostel => (
                <Col span={6} key={hostel.id}>
                  <HostelContainer
                    onClick={() => {
                      this.handleHostelDetail(hostel.id);
                    }}
                  >
                    <HostelImage src={hostel.image} />
                    <CityText>{hostel.city}</CityText>
                    <HostelText>{hostel.name}</HostelText>
                    <HostelPriceText>
                      <b>{Number(hostel.price).toLocaleString()}</b>
                      &nbsp;/ night
                    </HostelPriceText>
                  </HostelContainer>
                </Col>
              ))}
            </Row>
          </HomeContainer>
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
      </>
    );
  }
}

Home.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Home);
