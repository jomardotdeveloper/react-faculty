import React, { useState } from "react";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import { Form, FormGroup, Spinner, Alert } from "reactstrap";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signin } from "../database/Register";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");

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
  const onFormSubmit = async (formData) => {
    var res = await signin(formData);
    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.is_admin) {
        setTimeout(() => {
          window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/members" : "/members"}`,
            "auth-login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/members" : "/members"}`
          );
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          window.history.pushState(
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/works" : "/works"}`,
            "auth-login",
            `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL + "/works" : "/works"}`
          );
          window.location.reload();
        }, 2000);
      }
    } else {
      errorToast(res.message[0]);
    }
  };

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Login" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <PreviewCard className="card-bordered text-center" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Sign In</BlockTitle>
                <BlockDes>
                  <p>Faculty Management System</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            {errorVal && (
              <div className="mb-3">
                <Alert color="danger" className="alert-icon">
                  {" "}
                  <Icon name="alert-circle" /> Unable to login with credentials{" "}
                </Alert>
              </div>
            )}
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={register({ required: "This field is required" })}
                    className="form-control-lg form-control"
                  />
                  {errors.email && <span className="invalid">{errors.email.message}</span>}
                </div>
              </FormGroup>
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={register({ required: "This field is required" })}
                    className="form-control-lg form-control"
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </FormGroup>

              <FormGroup>
                <Button type="submit" color="primary">
                  Sign in
                </Button>
                <br />
                <Link to={`${process.env.PUBLIC_URL}/register`}>
                  <Button color="primary mt-2">Create an account</Button>
                </Link>
              </FormGroup>
            </Form>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
      <ToastContainer />
    </React.Fragment>
  );
};
export default Login;
