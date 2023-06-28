/* ---- Breakdown ---- */
// Prerequisite:
// 1. Install npm packages: react-leaflet, leaflet
// 2. Create Map component
// 3. Disable ssr for Map component using "next/dynamic" **important**

// General Steps:
// 1. User enter a domain / ip adress
// 2. When the button is clicked, validate input is ip adress or domain
// 3. When submit button is pressed, collect input value in useState hook
// 4. Make an internal POST request to /api/ipify with useEffect hook, listening to the update of user input data
// 5. Make a GET request to external API
// 6. Response to client side
// 7. Update the data state and UI

import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.css";
import utils from "@/styles/Utils.module.css";
import TopSection from "@/components/TopSection";
import DataDisplay from "@/components/DataDisplay";

export default function Home() {
  const [inputValue, setInputValue] = useState({
    type: "",
    value: "",
  });
  const [data, setData] = useState({
    ip: "",
    country: "",
    city: "",
    lat: 0,
    lng: 0,
    postalCode: "",
    timezone: "",
    isp: "",
  });

  useEffect(() => {
    const handleInputValueUpdate = async () => {
      const response = await fetch(`/api/ipify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      const data = await response.json();
      setData({
        ip: data.ip,
        country: data.location.country,
        city: data.location.city,
        lat: data.location.lat,
        lng: data.location.lng,
        postalCode: data.location.postalCode,
        timezone: data.location.timezone,
        isp: data.isp,
      });
      // console.log(data);
    };
    handleInputValueUpdate();
  }, [inputValue]);

  const MapWithNoSSR = React.useMemo(() =>
    dynamic(() => import("@/components/Map"), {
      // This line is important. It's what prevents server-side render
      ssr: false,
    })
  );

  const validateInput = (input) => {
    // No API call is executed if same input
    if (input.value === inputValue.value) {
      return;
    }
    // Regular expressions for IP address and domain
    var ipAddressRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
    var domainRegex =
      /^[a-zA-Z][a-zA-Z0-9-]*?(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

    if (ipAddressRegex.test(input.value)) {
      setInputValue({
        type: "ipAddress",
        value: input.value,
      });
      input.value = "";
    } else if (domainRegex.test(input.value)) {
      setInputValue({
        type: "domain",
        value: input.value,
      });
      input.value = "";
    } else {
      return alert("Please enter a valid IP address or URL");
    }
  };

  return (
    <>
      <Head>
        <title>Frontend Mentor | IP Address Tracker</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.container} ${styles.grid}`}>
        <main>
          <h1 className={utils.srOnly}>IP Address Tracker</h1>
          <TopSection onSearch={validateInput} />

          <DataDisplay data={data} />

          <MapWithNoSSR
            className={styles.map}
            position={[data.lat, data.lng]}
            popupText={data.isp}
          />
        </main>

        <footer className={utils.textCenter}>
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="https://github.com/kennylun123">Kenny Ng</a>.
        </footer>
      </div>
    </>
  );
}
