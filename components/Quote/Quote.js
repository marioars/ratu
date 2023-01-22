import styles from "./Quote.module.css";

const Quote = (props) => {
  const { slogan } = props;
  return (
    <div className={styles.container}>
      <span>{slogan.text}</span>
    </div>
  );
};

export default Quote;
