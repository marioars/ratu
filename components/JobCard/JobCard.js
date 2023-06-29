import React from "react";
import Image from "next/image";
import styles from "./JobCard.module.css";
import { myLoader } from "../../configs/loader";
import Link from "next/link";

const JobCard = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.cruiseImage}
          src={item.logo_principal}
          width={160}
          height={160}
          alt="cruises"
          priority
          loader={myLoader}
        />
      </div>
      <div className={styles.descContainer}>
        <h2>{item.name_position}</h2>
        <h4>{item.name_type_contract}</h4>
        <h4>{item.location}</h4>
        <div className={styles.buttonContainer}>
          <button>
            <Link href={`/career/jobDetail/${item.slug_career_principal}`}>
              Apply
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
