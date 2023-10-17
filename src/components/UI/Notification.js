import styles from './Notification.module.css';

const Notification = ({ status, message, title }) => {
  let specialStyles = '';

  if (status === 'error') {
    specialStyles = styles.error;
  }
  if (status === 'success') {
    specialStyles = styles.success;
  }
  if (status === 'loading') {
    specialStyles = styles.loading;
  }

  const cssStyles = `${styles.notification} ${specialStyles}`;

  return (
    <section className={cssStyles}>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </section>
  );
};

export default Notification;
