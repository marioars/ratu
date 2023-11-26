import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import styles from "./apply.module.css";
import { server } from "../../../configs/domain";
import convertImage from "../../../helpers/base64";

const Apply = ({ detailJob, domicile }) => {
  const photoRef = useRef();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    nik: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    dob: "",
    sex: null,
    domicile_id: null,
    province: "",
    home_address: "",
    home_city_airport: "",
    career_principal_id: detailJob.data.id_career_principal,
    tattoos: 0,
    educational_background: [
      {
        type_edu: "Elementary School",
        name_edu: "",
        from: "",
        end: "",
      },
      {
        type_edu: "Junior High School",
        name_edu: "",
        from: "",
        end: "",
      },
      {
        type_edu: "Vocational High School",
        name_edu: "",
        from: "",
        end: "",
      },
    ],
    working_experience: [
      {
        name_experience: "",
        job_position: "",
        from: "",
        end: "",
      },
    ],
    file_passport: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    file_seaman_book: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    file_c1d_visa: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    file_certificate_basic_st: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    file_certificate_safety_at: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    file_certificate_crowd_m: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    file_certificate_crisis_mhb: {
      number: "",
      date_of_issue: "",
      date_of_expiry: "",
    },
    image_profile: {
      nama_file: "",
      base64: "",
    },
  });

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHasTattooChange = (e) => {
    let value = 0;
    if (e.target.value === "yes") {
      value = 1;
    }
    setFormData((prevData) => ({ ...prevData, tattoos: value }));
  };

  const handleVisibleWithShortSleevesChange = (e) => {
    const value = e.target.value === "yes" ? 1 : 2;
    setFormData((prevData) => ({ ...prevData, tattoos: value }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducationalBackground = [...formData.educational_background];
    updatedEducationalBackground[index][field] = value;
    setFormData({
      ...formData,
      educational_background: updatedEducationalBackground,
    });
  };

  const addEducation = (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    updatedFormData.educational_background.push({
      type_edu: "Add for higher levels (Optional)",
      name_edu: "",
      from: "",
      end: "",
    });
    setFormData(updatedFormData);
  };

  const removeEducation = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.educational_background.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleWorkChange = (index, field, value) => {
    const updatedWorkingExperience = [...formData.working_experience];
    updatedWorkingExperience[index][field] = value;
    setFormData({
      ...formData,
      working_experience: updatedWorkingExperience,
    });
  };

  const addWorkExperience = (e) => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    updatedFormData.working_experience.push({
      name_experience: "",
      job_position: "",
      from: "",
      end: "",
    });
    setFormData(updatedFormData);
  };

  const removeWorkExperience = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.working_experience.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const convertFileToBase64 = async (file) => {
    const gambar = URL.createObjectURL(file);
    const hasilConvert = await convertImage(gambar);
    return hasilConvert;
  };

  const buildFileRequestBody = useCallback(async () => {
    const defaultFile = {
      nama_file: null,
      base64: null,
    };
    let result = {
      image_profile: defaultFile,
    };

    const photo = photoRef.current.files[0];
    if (photo) {
      const base64Passport = await convertFileToBase64(photo);
      result.image_profile = {
        nama_file: photo.name,
        base64: base64Passport,
      };
    }
    return result;
  }, [photoRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const files = await buildFileRequestBody();
      const requestBody = {
        nik: formData.nik,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        email: formData.email,
        dob: formData.dob,
        sex: formData.sex,
        domicile_id: 1,
        province: formData.province,
        home_address: formData.home_address,
        home_city_airport: formData.home_city_airport,
        career_principal_id: formData.career_principal_id,
        tattoos: formData.tattoos,
        educational_background: formData.educational_background.map((edu) => ({
          type_edu: edu.type_edu,
          name_edu: edu.name_edu,
          from: edu.from,
          end: edu.end,
        })),
        working_experience: formData.working_experience.map((work) => ({
          name_experience: work.name_experience,
          job_position: work.job_position,
          from: work.from,
          end: work.end,
        })),
        file_passport: {
          number: formData.file_passport.number,
          date_of_issue: formData.file_passport.date_of_issue,
          date_of_expiry: formData.file_passport.date_of_expiry,
        },
        file_seaman_book: {
          number: formData.file_seaman_book.number,
          date_of_issue: formData.file_seaman_book.date_of_issue,
          date_of_expiry: formData.file_seaman_book.date_of_expiry,
        },
        file_c1d_visa: {
          number: formData.file_c1d_visa.number,
          date_of_issue: formData.file_c1d_visa.date_of_issue,
          date_of_expiry: formData.file_c1d_visa.date_of_expiry,
        },
        file_certificate_basic_st: {
          number: formData.file_certificate_basic_st.number,
          date_of_issue: formData.file_certificate_basic_st.date_of_issue,
          date_of_expiry: formData.file_certificate_basic_st.date_of_expiry,
        },
        file_certificate_safety_at: {
          number: formData.file_certificate_safety_at.number,
          date_of_issue: formData.file_certificate_safety_at.date_of_issue,
          date_of_expiry: formData.file_certificate_safety_at.date_of_expiry,
        },
        file_certificate_crowd_m: {
          number: formData.file_certificate_crowd_m.number,
          date_of_issue: formData.file_certificate_crowd_m.date_of_issue,
          date_of_expiry: formData.file_certificate_crowd_m.date_of_expiry,
        },
        file_certificate_crisis_mhb: {
          number: formData.file_certificate_crisis_mhb.number,
          date_of_issue: formData.file_certificate_crisis_mhb.date_of_issue,
          date_of_expiry: formData.file_certificate_crisis_mhb.date_of_expiry,
        },
        ...files,
      };
      const { data } = await axios.post(
        `${server}/api/v1/career/apply/v4`,
        requestBody
      );
      console.log(requestBody, "requestBody");
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Application has been sent",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/career");
        setLoading(false);
        setFormData({
          nik: "",
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          dob: "",
          sex: null,
          domicile_id: null,
          province: "",
          home_address: "",
          home_city_airport: "",
          career_principal_id: null,
          career_principal_id_second: null,
          tattoos: 0,
          educational_background: [],
          working_experience: [],
          file_passport: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          file_seaman_book: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          file_c1d_visa: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          file_certificate_basic_st: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          file_certificate_safety_at: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          file_certificate_crowd_m: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          file_certificate_crisis_mhb: {
            number: "",
            date_of_issue: "",
            date_of_expiry: "",
          },
          image_profile: {
            nama_file: "",
            base64: "",
          },
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.msg || error.response.data.error,
      });
      console.log("failed to submit form", error);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.flexListContainer}>
        <div className={styles.flexList}>
          <label htmlFor="nik">ID Number(NIK)</label>
          <input
            className={styles.nik}
            onChange={handleInputChange}
            type="text"
            id="nik"
            name="nik"
            value={formData.nik}
            placeholder="000"
            required
          />
        </div>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.flexList}>
          <label htmlFor="first_name">Full Name</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            placeholder="First Name"
            required
          />
        </div>
        <div className={styles.flexList}>
          <label className={styles.displayNone} htmlFor="last_name">
            Last Name
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.flexList}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleInputChange}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.flexList}>
          <label htmlFor="phone">Phone</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            required
          />
        </div>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.flexList}>
          <label htmlFor="dob">Date Of Birth</label>
          <input
            onChange={handleInputChange}
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            required
          />
        </div>
        <div className={styles.flexList}>
          <label htmlFor="sex">Gender</label>
          <select
            className={styles.selectBox2}
            value={formData.sex || ""}
            onChange={handleSelectChange}
            id="sex"
            name="sex"
            required
          >
            <option value="">Select Your Gender</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.leftContainer}>
          <label htmlFor="home_address">Home Address</label>
          <textarea
            onChange={handleInputChange}
            value={formData.home_address}
            name="home_address"
            id=""
            cols="30"
            rows="7"
            required
          ></textarea>
        </div>
        <div className={styles.rightContainer}>
          <div>
            <label htmlFor="domicile_id">Country</label>
            <select
              className={styles.selectBox}
              value={formData.domicile_id || ""}
              onChange={handleSelectChange}
              id="domicile_id"
              name="domicile_id"
              required
            >
              <option value="">Select Country</option>
              {domicile?.data?.map((item) => (
                <option key={item.id_domicile} value={item.id_domicile}>
                  {item.name_country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="province">Province</label>
            <input
              className={styles.province}
              type="text"
              onChange={handleInputChange}
              id="province"
              name="province"
              value={formData.province}
              placeholder="Province"
              required
            />
          </div>
        </div>
      </div>
      <div className={styles.flexListContainer}>
        <div className={styles.flexList}>
          <label htmlFor="home_city_airport">Home City Airport</label>
          <input
            className={styles.nik}
            onChange={handleInputChange}
            type="text"
            id="home_city_airport"
            name="home_city_airport"
            value={formData.home_city_airport}
            placeholder=""
            required
          />
        </div>
      </div>
      <div className={styles.flexListContainer2}>
        <label htmlFor="home_city_airport">Do you have Tattoos</label>
        <div className={styles.flexListContainerRadio}>
          <div className={styles.flexListRadio}>
            <input
              type="radio"
              name="hasTattoo"
              value="yes"
              onChange={handleHasTattooChange}
              required
            />
            <label className={styles.tattooLabel}>Yes</label>
          </div>
          <div className={styles.flexListRadio}>
            <input
              type="radio"
              name="hasTattoo"
              value="no"
              onChange={handleHasTattooChange}
              required
            />
            <label className={styles.tattooLabel}>No</label>
          </div>
        </div>
      </div>
      {formData.tattoos !== 0 && (
        <div className={styles.flexListContainer2}>
          <p>Does your tattoo can be seen when you wear short sleeve?</p>
          <div className={styles.flexListContainerRadio}>
            <div className={styles.flexListRadio}>
              <input
                type="radio"
                name="visibleWithShortSleeves"
                value="yes"
                onChange={handleVisibleWithShortSleevesChange}
                required
              />
              <label className={styles.tattooLabel}>Yes</label>
            </div>
            <div className={styles.flexListRadio}>
              <input
                type="radio"
                name="visibleWithShortSleeves"
                value="no"
                onChange={handleVisibleWithShortSleevesChange}
                required
              />
              <label className={styles.tattooLabel}>No</label>
            </div>
          </div>
        </div>
      )}
      <div className={styles.topContainer}>
        {formData.educational_background.map((edu, index) => (
          <div className={styles.educationContainer} key={index}>
            <div className={styles.educationList}>
              <label>{edu.type_edu}</label>
              <input
                type="text"
                value={edu.name_edu}
                onChange={(e) =>
                  handleEducationChange(index, "name_edu", e.target.value)
                }
                placeholder="School Name"
              />
            </div>
            <div className={styles.educationList}>
              <label>From:</label>
              <input
                type="date"
                value={edu.from}
                onChange={(e) =>
                  handleEducationChange(index, "from", e.target.value)
                }
                max={today}
              />
            </div>
            <div className={styles.educationList}>
              <label>To:</label>
              <input
                type="date"
                value={edu.end}
                onChange={(e) =>
                  handleEducationChange(index, "end", e.target.value)
                }
                max={today}
              />
            </div>
            {edu.type_edu === "Add for higher levels (Optional)" && (
              <button
                className={styles.buttonDelete}
                onClick={() => removeEducation(index)}
              >
                <Image
                  src="/assets/delete-icon.png"
                  width={20}
                  height={20}
                  alt="delete"
                />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={addEducation}>Add Educational Background</button>
      </div>
      <div className={styles.topContainer}>
        {formData.working_experience.map((work, index) => (
          <div className={styles.educationContainer} key={index}>
            <div className={styles.educationList}>
              <label>
                {index !== 0
                  ? "Add more experience (Optional)"
                  : "Working Experience"}
              </label>
              <input
                type="text"
                value={work.name_experience}
                onChange={(e) =>
                  handleWorkChange(index, "name_experience", e.target.value)
                }
                placeholder="Name of Employer"
              />
            </div>
            <div className={styles.educationList}>
              <label>Job Position:</label>
              <input
                type="text"
                value={work.job_position}
                onChange={(e) =>
                  handleWorkChange(index, "job_position", e.target.value)
                }
              />
            </div>
            <div className={styles.educationList}>
              <label>From:</label>
              <input
                type="date"
                value={work.from}
                onChange={(e) =>
                  handleWorkChange(index, "from", e.target.value)
                }
                max={today}
              />
            </div>
            <div className={styles.educationList}>
              <label>To:</label>
              <input
                type="date"
                value={work.end}
                onChange={(e) => handleWorkChange(index, "end", e.target.value)}
                max={today}
              />
            </div>
            {index !== 0 && (
              <button
                className={styles.buttonDelete}
                onClick={() => removeWorkExperience(index)}
              >
                <Image
                  src="/assets/delete-icon.png"
                  width={20}
                  height={20}
                  alt="delete"
                />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={addWorkExperience}>Add Working Experience</button>
      </div>
      <div className={styles.topContainer}>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>Passport</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_passport"
              name="file_passport"
              value={formData.file_passport.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_passport"
              name="file_passport"
              value={formData.file_passport.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_passport"
              name="file_passport"
              value={formData.file_passport.date_of_expiry}
              min={today}
            />
          </div>
        </div>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>Seaman Book</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_seaman_book"
              name="file_seaman_book"
              value={formData.file_seaman_book.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_seaman_book"
              name="file_seaman_book"
              value={formData.file_seaman_book.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_seaman_book"
              name="file_seaman_book"
              value={formData.file_seaman_book.date_of_expiry}
              min={today}
            />
          </div>
        </div>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>C1D Visa</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_c1d_visa"
              name="file_c1d_visa"
              value={formData.file_c1d_visa.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_c1d_visa"
              name="file_c1d_visa"
              value={formData.file_c1d_visa.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_c1d_visa"
              name="file_c1d_visa"
              value={formData.file_c1d_visa.date_of_expiry}
              min={today}
            />
          </div>
        </div>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>Certificate Basic Safety Training</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_certificate_basic_st"
              name="file_certificate_basic_st"
              value={formData.file_certificate_basic_st.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_basic_st"
              name="file_certificate_basic_st"
              value={formData.file_certificate_basic_st.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_basic_st"
              name="file_certificate_basic_st"
              value={formData.file_certificate_basic_st.date_of_expiry}
              min={today}
            />
          </div>
        </div>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>Certificate Security Awareness Training</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_certificate_safety_at"
              name="file_certificate_safety_at"
              value={formData.file_certificate_safety_at.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_safety_at"
              name="file_certificate_safety_at"
              value={formData.file_certificate_safety_at.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_safety_at"
              name="file_certificate_safety_at"
              value={formData.file_certificate_safety_at.date_of_expiry}
              min={today}
            />
          </div>
        </div>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>Certificate Crowd Management</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_certificate_crowd_m"
              name="file_certificate_crowd_m"
              value={formData.file_certificate_crowd_m.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_crowd_m"
              name="file_certificate_crowd_m"
              value={formData.file_certificate_crowd_m.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_crowd_m"
              name="file_certificate_crowd_m"
              value={formData.file_certificate_crowd_m.date_of_expiry}
              min={today}
            />
          </div>
        </div>
        <div className={styles.educationContainer}>
          <div className={styles.educationList}>
            <label>Certificate Crisis Management and Human Behaviour</label>
            <input
              onChange={handleInputChange}
              type="text"
              id="file_certificate_crisis_mhb"
              name="file_certificate_crisis_mhb"
              value={formData.file_certificate_crisis_mhb.number}
              placeholder="Number"
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of issue:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_crisis_mhb"
              name="file_certificate_crisis_mhb"
              value={formData.file_certificate_crisis_mhb.date_of_issue}
              max={today}
            />
          </div>
          <div className={styles.educationList}>
            <label>Date of expiry:</label>
            <input
              onChange={handleInputChange}
              type="date"
              id="file_certificate_crisis_mhb"
              name="file_certificate_crisis_mhb"
              value={formData.file_certificate_crisis_mhb.date_of_expiry}
              min={today}
            />
          </div>
        </div>
      </div>
      <div className={styles.topContainer}>
        <div className={styles.flexListContainer}>
          <div className={styles.flexList}>
            <label htmlFor="image_profile">Upload Pass Photo</label>
            <input
              className={styles.inputFile}
              accept="image/*"
              type="file"
              id="image_profile"
              name="image_profile"
              ref={photoRef}
              placeholder="Browse"
            />
          </div>
        </div>
      </div>
      <div className={styles.submitContainer}>
        <button className={styles.btnSubmit} type="submit">
          {loading ? <div className={styles.loader}></div> : "Submit"}
        </button>
      </div>
    </form>
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

export default Apply;
