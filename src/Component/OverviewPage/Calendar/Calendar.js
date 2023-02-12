import React, { useEffect, useState } from "react";
// to get data from api
import axios from "axios";
import AccessRefreshTokens from "../../../RefreshToken/AccessRefreshTokens";

// Style
import "./Calendar.css";
// Format Date
import Moment from "moment";
// // Global Modal Component -> popup
// import Modal from "../../GlobalComponents/Modal/Modal";

const Calendar = () => {
  const [Calendar, setCalendar] = useState([]);
  const [detailsModal, setModalDatils] = useState(Calendar);
  // const [t, i18n] = useTranslation();

  useEffect(() => {
    AccessRefreshTokens.getAccessToken();

    axios
      .get("https://data.argaam.com/api/v1/json/ir-api/overview/en", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.events);
        setCalendar(res.data.events);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem("token")]);

  const changeContent = (elm) => {
    setModalDatils([elm]);
    // console.log(detailsModal);
  };

  const changeLanguage = () =>
    i18n.language.charAt(0).toUpperCase() + i18n.language.charAt(1);

  return (
    <>
      <div className="calendar container-md py-5">
        <div className="row">
          <div className="main-title">
            <h2 className="calendar-header">
              {t("OverviewPage.Calendar.calendar")}
            </h2>
          </div>
          {Calendar?.slice(0, 2).map((item, idx) => {
            return (
              <div className="d-flex flex-wrap" key={idx}>
                <div className="year-info col-2">
                  <p className="year-day">
                    {Moment(item?.occursOn).format("D")}
                  </p>
                  <p className="year-month">
                    {Moment(item?.occursOn).format("MMM.")}
                  </p>
                  <p className="year-years">
                    {Moment(item?.occursOn).format("YYYY")}
                  </p>
                </div>

                <div className="calendar-body col-10">
                  <p>{item?.[`typeName${changeLanguage()}`]}</p>
                  <p className="calendar-desc">
                    {item?.[`description${changeLanguage()}`]
                      .replace(/(<([^>]+)>)/gi, "")
                      .substr(0, 245)}
                    ...
                  </p>
                  <div className="calendar-footer d-flex justify-content-between col-md-12">
                    <p className="">
                      Venue . <span>Companyq Khobar HQ</span>
                    </p>

                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#calenderModal"
                      onClick={() => changeContent(item)}
                      className="details-btn"
                    >
                      {t("Details.details")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <Modal id={"calenderModal"} name={t("OverviewPage.Calendar.calendar")}>
          <>
            {detailsModal?.map((item, idx) => {
              return (
                <div key={idx}>
                  <div className="modal-text">
                    <p>{t("OverviewPage.Calendar.Market")}</p>
                    <p>{item?.[`marketName${changeLanguage()}`]}</p>
                  </div>

                  <div className="modal-text">
                    <p>{t("OverviewPage.Calendar.Company")}</p>
                    <p>{item?.[`companyName${changeLanguage()}`]}</p>
                  </div>

                  <div className="modal-text">
                    <p>{t("OverviewPage.Calendar.Date")}</p>
                    <p>{item?.occursOn}</p>
                  </div>

                  <div className="modal-text">
                    <p>{t("OverviewPage.Calendar.CalendarType")}</p>
                    <p>{item?.[`typeName${changeLanguage()}`]}</p>
                  </div>

                  <div className="modal-text">
                    <p>{t("OverviewPage.Calendar.EventResult")}</p>
                    <p>-</p>
                  </div>

                  <div className="modal-text">
                    <p>{t("OverviewPage.Calendar.Venue")}</p>
                    <p>-</p>
                  </div>

                  <div className="modal-details">
                    <p className="details-text">{t("Details.details")}</p>
                    <p className="details-data">
                      {item?.[`description${changeLanguage()}`]?.replace(
                        /(<([^>]+)>)/gi,
                        ""
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        </Modal> */}
      </div>
    </>
  );
};

export default Calendar;
