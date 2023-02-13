import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import AccessRefreshTokens from "../../../RefreshToken/AccessRefreshTokens";

// import { useTranslation } from "react-i18next";
// Style
import "./Disclosure.css";

// Import Modal Component
// import Modal from "../../GlobalComponents/Modal/Modal";

// Format Date
import Moment from "moment";

const DisclosureComp = () => {
  const [Disclosure, setDisclosure] = useState([]);
  const [detailsModal, setModalDatils] = useState(Disclosure);

  useEffect(() => {
    AccessRefreshTokens.getAccessToken();

    axios
      .get(`https://data.argaam.com/api/v1/json/ir-api/overview/en`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.discloser);
        setDisclosure(res.data.discloser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localStorage.getItem("token")]);

  //  Popup events
  const changeContent = (elm) => {
    setModalDatils([elm]);
    // console.log(detailsModal);
  };

  return (
    <div className="disclosure py-5">
      <div className="container-md">
        <h2 className="disclosure-header">Disclosure</h2>

        {Disclosure?.slice(0, 3).map((item, idx) => {
          return (
            <div className="disclosure-container" key={idx}>
              <p className="disclosure-title">{item?.title}</p>
              <div className="disclosure-body d-flex justify-content-between">
                <div className="d-flex">
                  <p>{item?.source}</p>
                  <p> . </p>
                  <p>{item?.publishedOn}</p>
                </div>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#disclosureModal"
                  onClick={() => changeContent(item)}
                  className="disclosure-btn"
                >
                  Read
                </button>
              </div>
            </div>
          );
        })}

        <Link to={`/DisclosuresPage/${"disclosures"}`}>MORE</Link>
      </div>

      {/* <Modal id={"disclosureModal"}>
        <>
          {detailsModal?.map((item, idx) => {
            return (
              <div key={idx}>
                <div className="modal-text">
                  <p>{t("OverviewPage.Calendar.Market")}</p>
                  <p>{item?.articleSourceName}</p>
                </div>

                <div className="modal-text">
                  <p>{t("OverviewPage.Calendar.Company")}</p>
                  <p>{item?.articleSourceName}</p>
                </div>
              </div>
            );
          })}
        </>
      </Modal> */}
    </div>
  );
};

export default DisclosureComp;
