import styles from "@/styles/Home.module.css";

export default function TopSection({ onSearch }) {
  const handleClick = (e) => {
    e.preventDefault();
    const userInput = document.getElementById("userInput");
    onSearch(userInput);
  };

  return (
    <section className={`${styles.topSection} ${styles.flex}`}>
      <h2>IP Address Tracker</h2>
      <form className={styles.flex}>
        <input
          id="userInput"
          type="text"
          placeholder="Search for any IP address or domain"
        />
        <button
          type="submit"
          className={styles.arrow}
          onClick={handleClick}
          aria-label="Search Button"
        ></button>
      </form>
    </section>
  );
}
