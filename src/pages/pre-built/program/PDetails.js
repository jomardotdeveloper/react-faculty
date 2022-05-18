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
import { Spinner, FormGroup } from "reactstrap";
import { Modal, ModalBody } from "reactstrap";
import { Badge, Card } from "reactstrap";
import html2pdf from "html2pdf.js";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import Slider from "react-slick";
import { ProductContext } from "./PContext";
import { Link } from "react-router-dom";
import ProductVideo from "../../../images/product/video-a.jpg";
import ModalVideo from "react-modal-video";
import { SlickArrowLeft, SlickArrowRight } from "../../../components/partials/slick/SlickComponents";
import { useForm } from "react-hook-form";
import axios from "axios";
const ProductDetails = ({ match }) => {
  const { contextData } = useContext(ProductContext);
  const [data, setData] = contextData;
  const [currentUser, setCurrent] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const noValue = "N/A";
  useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      let product = data.find((item) => item.id === Number(id));
      setCurrent(product);
    } else {
      setCurrent(data[0]);
    }
    console.log(currentUser);
  }, [match.params.id]);
  async function update(formData) {
    var res = await axios.post("http://127.0.0.1:8000/api/faculty/update/" + currentUser.id, formData);
    var response = res.data;
    let newData = data;
    let index = newData.findIndex((item) => item.id === currentUser.id);
    let userId = newData[index].user.id;

    if (response.success) {
      console.log(response.data);
      newData[index] = response.data;
      setCurrent(response.data);
      setData([...newData]);
      setIsOpen(false);
    }
  }
  return (
    <React.Fragment>
      <Head title="Product Detail"></Head>

      {currentUser ? (
        <Content>
          <BlockHead size="sm">
            <BlockBetween className="g-3">
              <BlockHeadContent>
                {/* <Button color="primary" className="btn" onClick={() => setIsOpen(true)}>
                  Edit
                </Button> */}
                {/* <Link to={`${process.env.PUBLIC_URL}/product-card`}></Link>
                <Link to={`${process.env.PUBLIC_URL}/product-card`}>
                  <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                    <Icon name="arrow-left"></Icon>
                  </Button>
                </Link> */}
                <Button
                  color="info"
                  className="btn"
                  onClick={() => {
                    const thisHtml = document.getElementsByClassName("nk-block")[0];
                    var opt = {
                      margin: 0.1,
                      filename: "myfile.pdf",
                      image: { type: "jpeg", quality: 0.98 },
                      html2canvas: { scale: 2 },
                      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                    };
                    html2pdf().set(opt).from(thisHtml).save();
                  }}
                >
                  PDF
                </Button>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <input
              type="file"
              id="photo"
              style={{ display: "none" }}
              onChange={async (ev) => {
                if (ev.target.files.length > 0) {
                  let picture = new FormData();
                  picture.append("photo", ev.target.files[0]);
                  picture.append("id", currentUser.id);
                  await fetch("http://127.0.0.1:8000/api/faculty/profile", {
                    method: "POST",
                    body: picture,
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      setCurrent(result.data);
                      // localStorage.setItem("user", JSON.stringify(result.data));
                      // window.location.reload();
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }
              }}
            ></input>
            <Card className="card-bordered">
              <div className="card-inner">
                <Row>
                  <Col lg={12}>
                    <center>
                      {currentUser.faculty.picture ? (
                        <UserAvatar className="lg mb-2" image={"http://127.0.0.1:8000" + currentUser.faculty.picture} />
                      ) : (
                        <UserAvatar className="lg mb-2" theme="primary" text="NA" />
                      )}
                    </center>
                  </Col>
                </Row>
                <div className="overline-title-alt mb-2">Learning Program</div>
                <hr className="hr border-light" />
                <Row>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.title}</span>
                      <span className="sub-text">Title of learning and development program</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.hours}</span>
                      <span className="sub-text">Number of hours</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.from}</span>
                      <span className="sub-text">From</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.to}</span>
                      <span className="sub-text">To</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.ld}</span>
                      <span className="sub-text">Type of LD</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.sponsor}</span>
                      <span className="sub-text">Conducted by</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <div className="profile-stats">
                      <span className="amount">{currentUser.cover}</span>
                      <span className="sub-text">Coverage</span>
                    </div>
                  </Col>
                  <Col lg={3} className="mt-2">
                    <img src={"http://127.0.0.1:8000" + currentUser.cert}></img>
                  </Col>
                </Row>
              </div>
            </Card>
          </Block>
          <Modal isOpen={isOpen} className="modal-dialog-centered" size="lg">
            <ModalBody>
              <form encType="multipart/form-data" className="row gy-4 p-3" onSubmit={handleSubmit(update)}>
                <Row>
                  <Col md="5 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="first">
                        First Name
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="first"
                          name="first"
                          defaultValue={currentUser.first}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.first && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="5 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="last">
                        Last Name
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="last"
                          name="last"
                          defaultValue={currentUser.last}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.last && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="middle">
                        Middle Name
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="middle"
                          name="middle"
                          defaultValue={currentUser.middle}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="extension">
                        Name Extension
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="extension"
                          name="extension"
                          defaultValue={currentUser.extension}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="birthdate">
                        Date of Birth
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="date"
                          id="birthdate"
                          name="birthdate"
                          defaultValue={currentUser.birthdate}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.birthdate && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="number">
                        Employee Number
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="number"
                          name="number"
                          defaultValue={currentUser.number}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.number && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="place">
                        Place of Birth
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="place"
                          name="place"
                          defaultValue={currentUser.place}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.place && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="sex">
                        Sex
                      </label>
                      <div className="form-control-wrap">
                        <select
                          className="form-control-lg form-control"
                          id="sex"
                          name="sex"
                          defaultValue={currentUser.sex}
                          ref={register({ required: true })}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        {errors.sex && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="civil">
                        Civil Status
                      </label>
                      <div className="form-control-wrap">
                        <select
                          className="form-control-lg form-control"
                          id="civil"
                          name="civil"
                          defaultValue={currentUser.civil}
                          ref={register({ required: true })}
                        >
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="widowed">Widowed</option>
                        </select>
                        {errors.civil && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="height">
                        Height
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="height"
                          name="height"
                          defaultValue={currentUser.height}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.height && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="weight">
                        Weight
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          defaultValue={currentUser.weight}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.weight && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="blood">
                        Blood Type
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="blood"
                          name="blood"
                          defaultValue={currentUser.blood}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.blood && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="gsis">
                        GSIS ID
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="gsis"
                          name="gsis"
                          defaultValue={currentUser.gsis}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pagibig">
                        PAG-IBIG ID
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pagibig"
                          name="pagibig"
                          defaultValue={currentUser.pagibig}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="philhealth">
                        PHILHEALTH
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="philhealth"
                          name="philhealth"
                          defaultValue={currentUser.philhealth}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="sss">
                        SSS
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="sss"
                          name="sss"
                          defaultValue={currentUser.sss}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="tin">
                        TIN
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="tin"
                          name="tin"
                          defaultValue={currentUser.tin}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="citizenship">
                        Citizenship
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="citizenship"
                          name="citizenship"
                          defaultValue={currentUser.citizenship}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="telephone">
                        Telephone Number
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="telephone"
                          name="telephone"
                          defaultValue={currentUser.telephone}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="name">
                        Mobile Number
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          defaultValue={currentUser.mobile}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="name">
                        Alternate Email
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="email"
                          id="alternate"
                          name="alternate"
                          defaultValue={currentUser.alternate}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md="12" className="text-center">
                    <h6>Resident Address</h6>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rhouse">
                        House Lot Number
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rhouse"
                          name="rhouse"
                          defaultValue={currentUser.rhouse}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rstreet">
                        Street
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rstreet"
                          name="rstreet"
                          defaultValue={currentUser.rstreet}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rvillage">
                        Subdivision
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rvillage"
                          defaultValue={currentUser.rvillage}
                          name="rvillage"
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rbarangay">
                        Barangay
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rbarangay"
                          name="rbarangay"
                          defaultValue={currentUser.rbarangay}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.rbarangay && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rcity">
                        City
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rcity"
                          name="rcity"
                          defaultValue={currentUser.rcity}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.rcity && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rprovince">
                        Province
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rprovince"
                          defaultValue={currentUser.rprovince}
                          name="rprovince"
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.rprovince && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="rzip">
                        Zipcode
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="rzip"
                          name="rzip"
                          defaultValue={currentUser.rzip}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.rzip && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col md="12" className="text-center">
                    <h6>Permanent Address</h6>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="phouse">
                        House Lot Number
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="phouse"
                          defaultValue={currentUser.phouse}
                          name="phouse"
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pstreet">
                        Street
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pstreet"
                          name="pstreet"
                          defaultValue={currentUser.pstreet}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pvillage">
                        Subdivision
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pvillage"
                          name="pvillage"
                          defaultValue={currentUser.pvillage}
                          ref={register()}
                          className="form-control-lg form-control"
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pbarangay">
                        Barangay
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pbarangay"
                          name="pbarangay"
                          defaultValue={currentUser.pbarangay}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.pbarangay && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pcity">
                        City
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pcity"
                          name="pcity"
                          defaultValue={currentUser.pcity}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.pcity && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pprovince">
                        Province
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pprovince"
                          name="pprovince"
                          defaultValue={currentUser.pprovince}
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.pprovince && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="2 mt-2">
                    <FormGroup>
                      <label className="form-label" htmlFor="pzip">
                        Zipcode
                      </label>
                      <div className="form-control-wrap">
                        <input
                          type="text"
                          id="pzip"
                          defaultValue={currentUser.pzip}
                          name="pzip"
                          ref={register({ required: true })}
                          className="form-control-lg form-control"
                        />
                        {errors.pzip && <p className="text-danger">This field is required</p>}
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Col size="12">
                  <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                    <li>
                      <Button color="primary" size="md" type="submit">
                        Save
                      </Button>
                    </li>
                    <li>
                      <a
                        href="#cancel"
                        onClick={(ev) => {
                          ev.preventDefault();
                          // onFormCancel();
                          setIsOpen(false);
                        }}
                        className="link link-light"
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                </Col>
              </form>
            </ModalBody>
          </Modal>
        </Content>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ProductDetails;
