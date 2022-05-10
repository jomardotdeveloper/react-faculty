import React, { useState, useEffect, useRef, useContext } from "react";
import {
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Col,
  Row,
  Icon,
  Block,
  UserAvatar,
} from "../../../components/Component";
import { Badge, Card } from "reactstrap";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Slider from "react-slick";
import { ProductContext } from "./ProductContext";
import { Link } from "react-router-dom";
import ProductVideo from "../../../images/product/video-a.jpg";
import ModalVideo from "react-modal-video";
import { SlickArrowLeft, SlickArrowRight } from "../../../components/partials/slick/SlickComponents";

const sliderSettings = {
  className: "slider-init row",
  slidesToShow: 2,
  centerMode: false,
  slidesToScroll: 1,
  infinite: false,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    { breakpoint: 3000, settings: { slidesToShow: 4 } },
    { breakpoint: 1540, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const sliderSettingsDefault = {
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  slide: null,
  responsive: [
    { breakpoint: 1539, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 420, settings: { slidesToShow: 1 } },
  ],
  arrows: false,
  swipeToSlide: true,
  focusOnSelect: true,
  className: "slider-init slider-nav",
};

const ProductDetails = ({ match }) => {
  const { contextData } = useContext(ProductContext);

  const [data] = contextData;

  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState({});
  const [colorSector, setColorSelector] = useState(1);
  const [sizeSelector, setSizeSelector] = useState(1);
  const [counter, setCounter] = useState(1);
  const [videoOpen, setVideoOpen] = useState(false);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  // increases quantity number
  const increaseCounter = () => {
    setCounter((prevState) => prevState + 1);
  };

  // decreases quantity number
  const decreaseCounter = () => {
    if (counter !== 0) {
      setCounter((prevState) => prevState - 1);
    }
  };

  // changes slides
  const slideChange = (index) => {
    var product = sliderData.slider.find((item) => item.id === index);
    setCurrentSlide(product);
  };

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  // grabs the id of the url and loads the corresponding data
  useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      let product = data.find((item) => item.id === Number(id));
      if (product) {
        setSliderData(product);
        setCurrentSlide(product.slider[0]);
      }
    } else {
      setSliderData(data[0]);
      setCurrentSlide(data[0].slider[0]);
    }
  }, [match.params.id]);

  return (
    <React.Fragment>
      <Head title="Product Detail"></Head>
      {sliderData && sliderData.slider && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween className="g-3">
              <BlockHeadContent>
                <Link to={`${process.env.PUBLIC_URL}/product-card`}></Link>
                <Link to={`${process.env.PUBLIC_URL}/product-card`}>
                  <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                    <Icon name="arrow-left"></Icon>
                  </Button>
                </Link>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Card className="card-bordered">
              <div className="card-inner">
                <Row>
                  <Col lg={12}>
                    <center>
                      <UserAvatar className="lg mb-3" theme="primary" image={currentSlide.img} />
                    </center>
                  </Col>
                  <Col lg={12} className="text-center">
                    <div className="badge badge-outline-light badge-pill ucap">Faculty</div>
                    <h4>Jomar F. Ramos</h4>
                    <p class="sub-text">jomar.developer@gmail.com</p>
                  </Col>
                </Row>
                <div className="overline-title-alt mb-2">Profile</div>
                <hr className="hr border-light" />
                <Row>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Employee Number</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Name Extension</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Date of Birth</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Age</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Place of Birth</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Sex</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Civil Status</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Height</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Weight</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Blood Type</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">GSIS ID</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">PAG-IBIG ID</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">PHILHEALTH</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">SSS</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">TIN</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Citizenship</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Telephone Number</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Mobile Number</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Alternate Email address</span>
                    </div>
                  </Col>
                </Row>
                <div className="overline-title-alt mb-2 mt-4">Resident Address</div>
                <hr className="hr border-light" />
                <Row>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">House Lot Number</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Street</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Subdivision</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Barangay</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">City</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Province</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Zip Code</span>
                    </div>
                  </Col>
                </Row>
                <div className="overline-title-alt mb-2 mt-4">Permanent Address</div>
                <hr className="hr border-light" />
                <Row>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">House Lot Number</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Street</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Subdivision</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Barangay</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">City</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Province</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">TANGINAMO</span>
                      <span className="sub-text">Zip Code</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};

export default ProductDetails;
