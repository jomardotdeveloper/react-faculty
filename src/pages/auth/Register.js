import React, { useState } from "react";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
  Row,
  Col,
} from "../../components/Component";
import { Spinner, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signup } from "../database/Register";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();

  const errorToast = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: true,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: false,
      closeButton: <CloseButton />,
    });
  };
  const CloseButton = () => {
    return (
      <span className="btn-trigger toast-close-button" role="button">
        <Icon name="cross"></Icon>
      </span>
    );
  };

  const handleFormSubmit = async (data) => {
    var res = await signup(data);
    if (res.success) {
      setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-success`), 2000);
    } else {
      errorToast(res.message[0]);
    }
  };
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body wide-md">
          <PreviewCard bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent className="text-center">
                <BlockTitle tag="h4">Sign Up</BlockTitle>
                <BlockDes>
                  <p>Faculty Management System</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
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
                      Middle Initial
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="middle"
                        name="middle"
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
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.number && <p className="text-danger">This field is required</p>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4 mt-2">
                  <FormGroup>
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.email && <p className="text-danger">This field is required</p>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4 mt-2">
                  <FormGroup>
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.password && <p className="text-danger">This field is required</p>}
                    </div>
                  </FormGroup>
                </Col>
                <Col md="4 mt-2">
                  <FormGroup>
                    <label className="form-label" htmlFor="password">
                      Confirm Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.password && <p className="text-danger">This field is required</p>}
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
                        name="pzip"
                        ref={register({ required: true })}
                        className="form-control-lg form-control"
                      />
                      {errors.pzip && <p className="text-danger">This field is required</p>}
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup className="mt-2">
                <Button type="submit" color="primary">
                  Register
                </Button>
                <Link to={`${process.env.PUBLIC_URL}/login`}>
                  <Button color="primary" className="mx-2">
                    Go to Sign In
                  </Button>
                </Link>
              </FormGroup>
            </form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
      <ToastContainer />
    </React.Fragment>
  );
};
export default Register;
