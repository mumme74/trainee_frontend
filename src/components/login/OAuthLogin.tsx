import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

import { GOOGLE_CLIENT_ID } from "../../config/config";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/store";
import { IAuth } from "../../redux/actions/types";
import ErrorNotifier from "../header/ErrorNotifier";
//import { oAuthGoogle } from "../../redux/actions/auth";

type StatePropsT = {
  isAuthenticated: boolean;
  error: IAuth["error"];
};

type ActionPropsT = {
  oAuthGoogle: (res: any) => void; //typeof oAuthGoogle;
};

function OAuthLogin(props: StatePropsT & ActionPropsT) {
  const { t } = useTranslation("core");

  const responseGoogle = async (res: any) => {
    //console.log("response google", res);
    await props.oAuthGoogle(res);
  };

  const errorHappened = async () => {
    console.log('Error logging in');
    await props.oAuthGoogle({error: t("google_login_failed")})
  }

  return (
    <React.Fragment>
      <div className="container border-bottom mb-5">
        <div className="row">
          <div className="col-sm-2" />
          <h3 className="col-sm">{t("oauth2_header")}</h3>
        </div>
        <div className="row p-2">
          <div className="col-sm-2">
            <span className=" badge bg-danger">{props.error.message}</span>
          </div>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={credentialResponse=>responseGoogle(credentialResponse)}
              onError={errorHappened}
              //className="btn btn-outline-danger col-sm-2"
              auto_select
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: RootState): StatePropsT => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default compose(connect(mapStateToProps, actions))(OAuthLogin);
