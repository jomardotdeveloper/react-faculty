import React from "react";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle } from "../../components/Component";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <React.Fragment>
      <Head title="Success" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body">
          <div className="brand-logo pb-2">
            <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
              <button className="btn btn-primary">Go back to Sign In</button>
            </Link>
          </div>
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Your account has been created; please wait for admin approval.</BlockTitle>
              <BlockDes className="text-success">
                <p>You can sign in once your account has been approved</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Success;
