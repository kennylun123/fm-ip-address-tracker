import styles from "@/styles/Home.module.css";
import utils from "@/styles/Utils.module.css";

export default function DataDisplay({ data }) {
  const { ip, city, country, postalCode, timezone, isp } = data;
  return (
    <section className={styles.dataDisplay}>
      <ul
        className={`${styles.flex} ${utils.textCenter} ${utils.lgTextLeft}`}
        role="list"
      >
        <li>
          <div>IP Address</div>
          <div>{ip}</div>
          {/* <div>192.212.174.101</div> */}
        </li>
        <li>
          <div>Location</div>
          <div>{city + ", " + country + " " + postalCode}</div>
          {/* <div>Brooklyn, NY 10001</div> */}
        </li>
        <li>
          <div>Timezone</div>
          <div>
            <span>UTC </span>
            {timezone}
            {/* -05:00 */}
          </div>
        </li>
        <li>
          <div>ISP</div>
          <div>{isp}</div>
          {/* <div>SpaceX Starlink</div> */}
        </li>
      </ul>
    </section>
  );
}
