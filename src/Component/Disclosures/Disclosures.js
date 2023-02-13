import React, { useEffect, useState } from "react";
// Fetch Data
import axios from "axios";
import AccessRefreshTokens from "../../RefreshToken/AccessRefreshTokens";
// Tabs

import "react-tabs/style/react-tabs.css";
// Style
import "./Disclosures.css";
// Format Date
import moment from "moment";

function DisclosuresPage(props) {
  const [latestNews, setLatestNews] = useState([]); // News State Data
  const [discloser, setDiscloser] = useState([]); // Discloser Data
  const [activeTab, setActiveTab] = useState(1);

  const [index, setIndex] = useState(0);
  let activeLocation = window.location.pathname.split("/").pop();
  const tabList = document.querySelectorAll(".tabsList div"); // Tab Header
  useEffect(() => {
    AccessRefreshTokens.getAccessToken();
    axios
      .get(`https://data.argaam.com/api/v1/json/ir-api/overview/en`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLatestNews(res.data.latestNews);
        setDiscloser(res.data.discloser);
        // setCalendar(res.data.events);
        // console.log(res.data.discloser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeLocation, localStorage.getItem("token")]);

  const handelPopup = (id) => {
    console.log(latestNews[id]);
  };

  const handelTabs = (e) => {
    [].forEach.call(tabList, function (el) {
      el.classList?.remove("active-tab");
    });

    e.target.classList = `active-tab`;

    if (e.target.innerHTML === "News") {
      setIndex(0);
    } else if (e.target.innerHTML === "Disclosures") {
      setIndex(1);
    } else setIndex(2);
  };

  useEffect(() => {
    if (activeLocation === "News") {
      setIndex(0);
    } else if (activeLocation === "disclosures") {
      setIndex(1);
    } else if (activeLocation === "calendar") {
      setIndex(2);
    }

    if (activeLocation != "DisclosuresPage") {
      let test = document.getElementsByClassName("news");
      console.log(test);
      [].forEach.call(test, function (el) {
        el.classList?.remove("active-tab");
      });
    }

    console.log(activeLocation);
  }, [activeLocation]);

  return (
    <div className="disclosure-page">
      <div className="container-md py-4">
        <div className="Tabs">
          <div className="tabsList">
            <div
              style={{ width: "33%" }}
              className={`news  ${
                activeLocation === "news" || "disclosurePage"
                  ? "active-tab"
                  : ""
              } `}
              onClick={handelTabs}
            >
              News
            </div>
            <div
              style={{ width: "33%" }}
              className={`disclosures col-4 ${
                activeLocation == "disclosures" ? "active-tab" : null
              }`}
              onClick={handelTabs}
            >
              Disclosures
            </div>
            <div
              style={{ width: "33%" }}
              className={`calendar col-4 ${
                activeLocation == "calendar" ? "active-tab" : null
              }`}
              onClick={handelTabs}
            >
              Calendar
            </div>
          </div>

          <div className="tab-content">
            {/* News Section Tap*/}
            <div className="disclosures-content" hidden={index != 0}>
              {latestNews.slice(0, 6).map((newsItem, id) => {
                return (
                  <div className="row" key={id}>
                    <div className="col-md-2 col-lg-2 col-sm-12 col-12">
                      {moment(newsItem?.publishedOn, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                      )}
                    </div>
                    <div className="col-md-9 col-lg-9 col-sm-10 col-10">
                      {newsItem?.title}
                    </div>
                    <div
                      key={id}
                      onClick={() => handelPopup(id)}
                      className="popup-icon col-md-1 col-lg-1 col-sm-2 col-2"
                    >
                      <svg
                        stroke="currentColor"
                        fill="#2866a0"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclosures Section Tap*/}
            <div className="news-content" hidden={index != 1}>
              {discloser.slice(0, 6).map((newsItem, id) => {
                return (
                  <div className="row" key={id}>
                    <div className="col-md-2 col-lg-2 col-sm-12 col-12">
                      {moment(newsItem?.publishedOn, "DD-MM-YYYY").format(
                        "DD/MM/YYYY"
                      )}
                    </div>
                    <div className="col-md-9 col-lg-9 col-sm-10 col-10">
                      {newsItem?.title}
                    </div>
                    <div
                      key={id}
                      onClick={() => handelPopup(id)}
                      className="popup-icon col-md-1 col-lg-1 col-sm-2 col-2"
                    >
                      <svg
                        stroke="currentColor"
                        fill="#2866a0"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Calendar Section Tap*/}
            <div className="calendar-content" hidden={index != 2}>
              <h1>Calendar</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DisclosuresPage;
