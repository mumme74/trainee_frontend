import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { useTranslation } from "react-i18next";

import FormRow from "../form/FormRow";
import val from "../form/validators";
import * as actions from "../../redux/actions/index.action";
import OAuthLogin from "./OAuthLogin";
import { RootState, store } from "../../redux/store";
import { IAuth } from "../../redux/actions/action.types";
import { ILoginData, login } from "../../redux/actions/auth.action";

type StatePropsT = {
  error: IAuth["error"];
  isAuthenticated: boolean;
};

type ActionPropsT = {
  auth: {
    login: (data: ILoginData) => void;
  }
};

const Login: React.FC<StatePropsT & ActionPropsT> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { t } = useTranslation("core");

  const onSubmit = async (formData: ILoginData) => {
    try {
      console.log("submit");
      // we need to call a actionCreator
      login(formData)(store.dispatch);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      const navigate = useNavigate();
      navigate("/dashboard");
    }
  }, [props.isAuthenticated]);

  return (
    <React.Fragment>
      <OAuthLogin />
      <button
        className="btn btn btn-info"
        onClick={() => {
          setShowForm(!showForm);
        }}
      >
        {(showForm ? t("hide") : t("show")) + " " + t("login_form")}
      </button>
      {showForm && (
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errObj: { login?: string } = {};
            if (values.login?.length < 3) {
              if (values.login.indexOf("@") > -1) {
                errObj.login = val.userName(values.login);
              } else {
                errObj.login = val.emailValidator(values.login);
              }
            }
            return errObj;
          }}
        >
          {({ handleSubmit, pristine, form, submitting }) => (
            <form onSubmit={handleSubmit} className="container p-2">
              <div className="row">
                <div className="col-sm-2"></div>
                <h3 className="col-sm">{t("login")}</h3>
              </div>
              <Field
                name="login"
                type="text"
                caption={t("login")}
                component={FormRow}
              />
              <Field
                name="password"
                type="password"
                caption={t("password")}
                validate={val.passwordValidator}
                component={FormRow}
              />
              <div className="row">
                <div className="col-sm-2" />
                <div className="col-sm p-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                  >
                    {t("login")}
                  </button>
                  {props.error.message && (
                    <div className="badge bg-danger m-2">
                      {props.error.message}
                    </div>
                  )}
                  <Link className="mx-4" to="/signup">
                    {t("login_sign_up_as_new_user")}
                  </Link>
                  <Link className="mx-4" to="/passwordReset">
                    {t("req_pw_reset")}
                  </Link>
                </div>
              </div>
            </form>
          )}
        </Form>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.auth.error,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default compose(connect(mapStateToProps, actions))(Login);
