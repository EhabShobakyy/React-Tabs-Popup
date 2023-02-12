import React, { useEffect, useState } from "react";
// Fetch Data
import axios from "axios";
import AccessRefreshTokens from "../../RefreshToken/AccessRefreshTokens";
// Tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// Style
import "./Disclosures.css";
// Format Date
import moment from "moment";
import { Link } from "react-router-dom";

function DisclosuresPage(props) {
  const [latestNews, setLatestNews] = useState([]); // News State
  const [discloser, setDiscloser] = useState([]);
  const [calendar, setCalendar] = useState([]);

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
  }, [localStorage.getItem("token")]);

  const handelPopup = (id) => {
    console.log(latestNews[id]);
  };

  let activeLocation = window.location.pathname.split("/").pop();
  let tabName = document.getElementsByClassName(`${activeLocation}`);
  // console.log(activeLocation);

  if (activeLocation === "disclosures") {
    let allTabs = document.getElementsByTagName("li");

    [].forEach.call(allTabs, function (el) {
      el.classList?.remove("react-tabs__tab--selected");
    });
  }

  [].forEach.call(tabName, function (test) {
    test.classList = `${activeLocation} + react-tabs__tab--selected `;
  });

  return (
    <div className="container-md py-4">
      <Tabs>
        <TabList className="main-tabs">
          <Tab className="news">News</Tab>
          <Tab className={`disclosures `}>Disclosures</Tab>
          <Tab className="calendar">Calendar</Tab>
        </TabList>

        {/* News Section Tap*/}
        <TabPanel>
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
        </TabPanel>

        {/* Disclosures Section Tap*/}
        <TabPanel>
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
        </TabPanel>
        {/* Calendar Section Tap*/}
        <TabPanel>
          <h1>asdasdasd</h1>
        </TabPanel>
      </Tabs>
    </div>
  );
}
export default DisclosuresPage;
