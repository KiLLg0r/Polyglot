import styles from "./dashboard.module.scss";

// Components
import Sidebar from "@components/Sidebar";

const Dashboard = () => {
  return (
    <main className={styles.dashboard}>
      <div className={styles.dashboard_content}>
        <h1>Dashboard</h1>
        <div className={styles.background} />
      </div>
    </main>
  );
};

export default Dashboard;
