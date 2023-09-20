import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "./JobCard.module.css";
import { myLoader } from "../../configs/loader";

const JobCard = ({ item }) => {
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyClick = async () => {
    setIsApplying(true);
    setTimeout(async () => {
      try {
        router.push(`/career/jobDetail/${item.slug_career_principal}`);
      } catch (error) {
        console.error("Terjadi kesalahan", error);
      } finally {
        setIsApplying(false);
      }
    }, 1000);
  };
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
          <button onClick={handleApplyClick} disabled={isApplying}>
            {isApplying ? <div className={styles.loader}></div> : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
