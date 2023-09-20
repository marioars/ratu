import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { server } from "../../../configs/domain";
import { myLoader } from "../../../configs/loader";
import styles from "./jobDetail.module.css";

const JobDetail = ({ detailJob }) => {
  const router = useRouter();
  const [isApplying, setIsApplying] = useState(false);

  const handleOpen = useCallback(() => {
    setIsApplying(true);
    setTimeout(async () => {
      try {
        router.push(`/career/apply/${detailJob.data.slug_career_principal}`);
      } catch (error) {
        console.error("Terjadi kesalahan", error);
      } finally {
        setIsApplying(false);
      }
    }, 1000);
  }, [router, detailJob]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logo}
                src={detailJob.data.logo_principal}
                width={0}
                height={0}
                alt={detailJob.data.name_principal}
                priority
                loader={myLoader}
              />
            </div>
            <div className={styles.jobDescTitle}>
              <div className={styles.jobTitle}>
                <h2>{detailJob.data.name_position}</h2>
              </div>
              <div className={styles.jobSubtitle}>
                <div className={styles.descJob}>
                  <Image
                    className={styles.iconJobDesc}
                    src="/assets/type-contract.svg"
                    width={0}
                    height={0}
                    alt="type-contract"
                    priority
                    loader={myLoader}
                  />
                  <span>{detailJob.data.name_type_contract}</span>
                </div>
                <div className={styles.descJob}>
                  <Image
                    className={styles.iconJobDesc}
                    src="/assets/location.svg"
                    width={0}
                    height={0}
                    alt="location"
                    priority
                    loader={myLoader}
                  />
                  <span>{detailJob.data.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={styles.requirementContainer}
          dangerouslySetInnerHTML={{ __html: detailJob.data.requirement }}
        ></div>
        <div className={styles.buttonContainer}>
          <button onClick={handleOpen}>
            {isApplying ? <div className={styles.loader}></div> : "Apply"}
          </button>
        </div>
      </div>
      {/* {openModal && (
        <FormModal
          detailJob={detailJob}
          setOpenModal={setOpenModal}
          openModal={openModal}
          domicile={domicile}
        />
      )} */}
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const res = await fetch(`${server}/api/v1/career/detail/${slug}`);
  const domicileRes = await fetch(`${server}/api/v1/domicile`);
  const detailJob = await res.json();
  const domicile = await domicileRes.json();
  return {
    props: { detailJob, domicile },
  };
}

export default JobDetail;
