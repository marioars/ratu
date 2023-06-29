import React from "react";
import JobCard from "../JobCard/JobCard";
import styles from "./JobList.module.css";

const JobList = ({ jobs }) => {
  return (
    <div className={styles.container}>
      {jobs &&
        jobs.map((item) => (
          <JobCard key={item.id_career_principal} item={item} />
        ))}
    </div>
  );
};

export default JobList;
