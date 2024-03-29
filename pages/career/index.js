import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import styles from "./career.module.css";
import { myLoader } from "../../configs/loader";
import { server } from "../../configs/domain";
import JobList from "../../components/JobList/JobList";

const images = [
  {
    id: 0,
    src: "/assets/images/career1.png",
    type: "Recruitments",
    alt: "career1",
  },
  {
    id: 1,
    src: "/assets/images/career2.png",
    type: "Apply",
    alt: "career2",
  },
  {
    id: 2,
    src: "/assets/images/career3.png",
    type: "Screening",
    alt: "career3",
  },
  {
    id: 3,
    src: "/assets/images/career4.png",
    type: "Get a Job & Achieve",
    alt: "career4",
  },
];

const Career = ({ principals }) => {
  const [jobs, setJobs] = useState(null);
  const [selectedPrincipal, setSelectedPrincipal] = useState("");
  const [searchText, setSearchText] = useState("");
  const [city, setCity] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePrincipalChange = (event) => {
    setSelectedPrincipal(event.target.value);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (jobs) => {
    const filteredData = jobs?.filter((item) =>
      item.name_position?.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filteredData);
  };

  const fetchJobCruises = async () => {
    setLoading(true);
    const res = await fetch(
      `${server}/api/v1/career/open/${selectedPrincipal}?location=${city}`
    );
    const jobs = await res.json();
    handleSearch(jobs?.data);
    setLoading(false);
  };

  const handleSearchPrincipal = () => {
    if (selectedPrincipal) {
      fetchJobCruises();
    } else if (searchText) {
      handleSearch();
    }
  };

  const fetchJobsByBtn = async (id) => {
    setLoading(true);
    setCity(id);
    setLoading(false);
  };

  return (
    <AnimatedPage>
      <Head>
        <title>Career - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {images.map((image) => (
            <div className={styles.flowContainer} key={image.id}>
              <Image
                className={styles.image}
                src={image.src}
                height={0}
                width={0}
                alt={image.alt}
                priority
                loader={myLoader}
              />
              <span>{image.type}</span>
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.borderContainer}>
            <select
              className={styles.selOpt}
              name="principals"
              id="principals"
              placeholder="Principals"
              value={selectedPrincipal}
              onChange={handlePrincipalChange}
            >
              <option defaultValue="Principals">Principals</option>
              {principals.data.map((item) => (
                <option
                  className={styles.listOption}
                  key={item.id_principal}
                  value={item.slug_principal}
                >
                  {item.name_principal}
                </option>
              ))}
            </select>
            <div className={styles.lineVertical}></div>
            <div className={styles.iconSearch}>
              <Image
                src="/assets/icon-search.png"
                alt="search_icon"
                width={20}
                height={20}
              />
            </div>
            <input
              className={styles.inputText}
              type="text"
              placeholder="Job Positions"
              value={searchText}
              onChange={handleInputChange}
            />
            <button onClick={handleSearchPrincipal}>
              {loading ? <div className={styles.loader}></div> : "search"}
            </button>
          </div>
        </div>
        <div className={styles.buttonJobContainer}>
          {/* <button onClick={fetchAllJobs}>all</button> */}
          <button
            className={city === 1 ? styles.activeCity : styles.nonActiveCity}
            onClick={() => fetchJobsByBtn(1)}
          >
            Jakarta
          </button>
          <button
            className={city === 3 ? styles.activeCity : styles.nonActiveCity}
            onClick={() => fetchJobsByBtn(3)}
          >
            Yogyakarta
          </button>
          <button
            className={city === 2 ? styles.activeCity : styles.nonActiveCity}
            onClick={() => fetchJobsByBtn(2)}
          >
            Bali
          </button>
        </div>
        {loading ? (
          <div className={styles.loader}></div>
        ) : jobs === null ? (
          <span className={styles.spanNoVacancy}>
            Please select City that You want to apply...
          </span>
        ) : jobs.length > 0 ? (
          <JobList jobs={jobs} />
        ) : (
          <span className={styles.spanNoVacancy}>
            No current job openings...
          </span>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Career;

export const getStaticProps = async () => {
  const res = await fetch(server + "/api/v1/career/all-principal");
  const principals = await res.json();
  // if (!res.ok) {
  //   throw new Error(`Failed to fetch, received status ${res.status}`);
  // }
  return {
    props: {
      principals,
    },
    revalidate: 10,
  };
};
