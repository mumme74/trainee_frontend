import React, { useState, useRef, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import css from "./ErrorNotifier.module.css";
import { RootState } from "../../redux/store";
import type { IError } from "../../redux/reducers/error.reducer";
import DropdownMenu from "../menus/DropdownMenu";
import { clearAllErrors } from "../../redux/actions/error.action";
import { store } from "../../redux/store";

type StatePropsT = {
  //unauthenticated: boolean;
  errors: [IError?]; // get set from redux store
};

type JsxPropsT = object;

interface IElement extends Element {
  readonly offsetLeft: number;
  readonly offsetTop: number;
}

const ErrorNotifier: React.FC<React.PropsWithChildren<StatePropsT & JsxPropsT>> = (props) => {
  const menuNodeRef = useRef<HTMLDivElement>(null);
  const errorCircle = useRef<HTMLDivElement>(null);

  const { t } = useTranslation("core");

  const [showMenu, setShowMenu] = useState<boolean>(false);

  function clearErrorHandler() {
    clearAllErrors()(store.dispatch);
  }

  function stopClick(event: any) {
    let target = event.target as Element | null;
    while (target) {
      if (target === menuNodeRef.current || target === errorCircle.current) {
        event.stopPropagation();
        event.preventDefault();
        break;
      }

      target = target.parentNode as Element | null;
    }
  }

  return (
    <React.Fragment>
      <div onClick={stopClick}>
        {props.children}
        {props.errors.length > 0 && (
          <div
            className={css.errorCircle}
            ref={errorCircle}
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            title={props.errors.length + " " + t("error_notifier_count_post")}
          />
        )}
        <DropdownMenu
          caption={t("error_notifier_caption")}
          ref={menuNodeRef}
          show={showMenu}
          onClose={() => {
            setShowMenu(false);
          }}
        >
          <React.Fragment>
            <ul>
              {props.errors.map((err,i) => {
                return (
                  <li className="dropdown-item" key={i}>{err?.message || err?.type}</li>
                );
              })}
            </ul>
            <footer>
              <span></span>
              <button className="btn-small" onClick={clearErrorHandler}>
                {t("clear")}
              </button>
            </footer>
          </React.Fragment>
        </DropdownMenu>
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state: RootState): StatePropsT {
  return {
    errors: state.error.errors,
  };
}

export default connect(mapStateToProps)(ErrorNotifier);
