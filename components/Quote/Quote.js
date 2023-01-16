import styles from "./Quote.module.css";

const Quote = () => {
  return (
    <div className={styles.container}>
      <span>
        “We are proud to received the accolade of “Best Hiring Partner” from
        four of our cruise line clients for 2 years in a row.”
      </span>
    </div>
  );
};

export default Quote;
