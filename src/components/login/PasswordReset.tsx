import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { useTranslation } from "react-i18next";
import val from "../form/validators";
import * as actions from "../../redux/actions/index.action";
import {
  IReqPwReset,
  IPwResetNew,
  ePwResetState
} from "../../redux/actions/action.types";
import { RootState, store } from "../../redux/store";
import FormRow from "../form/FormRow";
import { pwResetClearError, pwResetNewSubmit, pwResetRequest, pwResetStateChanged } from "../../redux/actions/pwReset.action";
import { Badge, eBadgeType } from "../widgets/Badge";

type StatePropsT = {
  error: Error;
  state: ePwResetState;
}

type FormValuesT = {
  email?:string,
  password?:string,
  password2?:string
}

const PasswordReset: React.FC<StatePropsT> = (props) => {
  const { t } = useTranslation('core');
  const searchParams = new URLSearchParams(document.location.search);
  const token = decodeURIComponent(searchParams.get('token')+""),
        id = +(searchParams.get('id') ?? 0);

  // a error message
  const [message, setMessage] = useState(props.error?.message);

  const submit = async (formData: IReqPwReset | IPwResetNew) => {
    try {
      if (props.state === ePwResetState.NotStarted)
        return await pwResetRequest(formData as IReqPwReset)(store.dispatch);
      else if (props.state === ePwResetState.HasResetToken)
        return await pwResetNewSubmit(
            {password:(formData as IPwResetNew).password, id, token}
          )(store.dispatch);
      else {
        // clear search string without reloading page
        window.history.replaceState(
          {}, document.title, window.location.pathname);
        pwResetClearError()(store.dispatch);
      }
    } catch(err: any) {
      console.error(err);
    }
  }

  useEffect(()=>{
    if (token && id && props.state < ePwResetState.HasResetToken)
      pwResetStateChanged(ePwResetState.HasResetToken)(store.dispatch);

    switch(props.state) {
    case ePwResetState.NotStarted:
      return setMessage('');
    case ePwResetState.NewPasswordSent: // fallthrough
    case ePwResetState.RequestReset:
      return setMessage(
        `${t('in_progress')} ${t('please')} ${t('wait')}!`)
    case ePwResetState.EmailSent:
      return setMessage(t('password_reset_send_email'));
    case ePwResetState.HasResetToken:
      return setMessage(
        `${t('password_reset_have_reset_token')}`);
    case ePwResetState.PasswordHasChanged:
      return setMessage(`${t('succeeded')}!`)
    case ePwResetState.ErrorState:
      return setMessage(props.error?.message+"");
    default:
      console.error(`Unhandled state ${props.state}`);
    }
  }, [props.state, props.error, token, id]);

  const validate = (values: FormValuesT) => {
    const password2 = values.password2 !== values.password ? t('password_must_match') : undefined
    const password = val.passwordValidator(values.password+"");

    const errObj: FormValuesT = {};

    const email = val.emailValidator(values.email+"")
    if (email && !token) errObj.email = email;
    if (props.state === ePwResetState.HasResetToken) {
      if (password2) errObj.password2 = password2;
      if (password) errObj.password = password;
    }

    return errObj;
  }

  const badgeColor = ()=>{
    switch (props.state) {
    case ePwResetState.ErrorState: return eBadgeType.Error;
    case ePwResetState.HasResetToken: return eBadgeType.Warn;
    case ePwResetState.PasswordHasChanged: // fallthrough
    case ePwResetState.EmailSent: return eBadgeType.Success;
    case ePwResetState.RequestReset: // fallthrough
    case ePwResetState.NewPasswordSent: // fallthrough
    case ePwResetState.NotStarted: // fallthrough
    default: return eBadgeType.Info;
    }
  }

  return (
    <React.Fragment>
      <Form
        onSubmit={submit}
        validate={validate}
      >
        {({handleSubmit, pristine, form, submitting}) => (
          <form onSubmit={handleSubmit} className="container p-2">
            <div className="row">
              <div className="col-sm-2"></div>
              <h3 className="col-sm">{t('req_pw_reset')}</h3>
            </div>
            {/* display a error message*/}
            {message && (
              <div className="row">
                <div className="col-sm-2"></div>
                <Badge type={badgeColor()}>
                  {message}
                </Badge>
              </div>
            )}
            {// only display email when requesting a reset
             props.state < ePwResetState.EmailSent && (
              <React.Fragment>
                <Field
                  name="email"
                  type="email"
                  validate={val.emailValidator}
                  component={FormRow}
                  disabled={props.state >= ePwResetState.RequestReset}
                  caption={t("email")}
                ></Field>
              </React.Fragment>
            )}
            {props.state === ePwResetState.EmailSent && (
              <h3>{t('password_reset_look_in_email')}</h3>
            )}
            { // continue from email link
              props.state >= ePwResetState.HasResetToken &&
              props.state <  ePwResetState.PasswordHasChanged ? (
                <React.Fragment>
                  {["","2"].map(i=>(
                    <Field
                      name={`password${i}`}
                      type="password"
                      validate={val.passwordValidator}
                      component={FormRow}
                      caption={t(!i ? "password" : "confirm_password")}
                      key={i}>
                    </Field>
                  ))}
                </React.Fragment>
            ) : // when all are done we only display a link to our settings page
              props.state === ePwResetState.PasswordHasChanged && (
                <Link to="/profile">{t("dashroot_profile_page")}</Link>
            )}
            { // only render button
             (props.state === ePwResetState.NotStarted ||
              props.state === ePwResetState.HasResetToken ||
              props.state === ePwResetState.ErrorState) &&
              (
                <div className="row">
                  <div className="col-sm-2"></div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary col-sm-2">
                    {t('send')}
                  </button>
                </div>
              )
            }
          </form>
        )}
      </Form>
    </React.Fragment>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    error: state.pwReset.error,
    state: state.pwReset.state
  }
}

export default compose(
  connect(mapStateToProps, actions))(PasswordReset);