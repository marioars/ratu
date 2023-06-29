import Image from "next/image";
import React, { useRef, useState } from "react";
import { server } from "../../configs/domain";
import convertImage from "../../helpers/base64";
import styles from "./ModalFormApply.module.css";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

const data = [
  {
    id: 1,
    province: "Jakarta",
  },
  {
    id: 2,
    province: "Yogyakarta",
  },
  {
    id: 3,
    province: "Bali",
  },
];

const FormModal = ({ setOpenModal, openModal, detailJob, domicile }) => {
  const cvRef = useRef();
  const referRef = useRef();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    nik_or_passport: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    dob: "",
    sex: null,
    domicile_id: null,
    province: "",
    career_principal_id_first: detailJob.data.id_career_principal,
    file_cv: {
      nama_file: "",
      base64: "",
    },
    file_reference: {
      nama_file: "",
      base64: "",
    },
  });
  const preventModal = (e) => {
    e.stopPropagation();
    return false;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const getFileContentAsBlob = async (file) => {
    const response = await fetch(URL.createObjectURL(file));
    return await response.blob();
  };
  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };
  const convertBase64 = (base64Data) => {
    const data = base64Data.split(",")[1];
    return data;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cv = cvRef.current.files[0];
    const referensi = referRef.current.files[0];
    try {
      const cvBlob = await getFileContentAsBlob(cv);
      const referensiBlob = await getFileContentAsBlob(referensi);
      const base64Convert = await convertBlobToBase64(cvBlob);
      const base64Referensi = await convertBlobToBase64(referensiBlob);
      const base64Cv = convertBase64(base64Convert);
      const base64Ref = convertBase64(base64Referensi);
      const requestBody = {
        nik_or_passport: formData.nik_or_passport,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        email: formData.email,
        dob: formData.dob,
        sex: formData.sex,
        domicile_id: 1,
        province: formData.province,
        career_principal_id_first: formData.career_principal_id_first,
        file_cv: {
          nama_file: cv.name,
          base64: base64Cv,
        },
        file_reference: {
          nama_file: referensi.name,
          base64: base64Ref,
        },
        file_passport: {
          nama_file: null,
          base64: null,
        },
        file_seaman_book: {
          nama_file: null,
          base64: null,
        },
        file_basic_stc: {
          nama_file: null,
          base64: null,
        },
        file_security_atc: {
          nama_file: null,
          base64: null,
        },
        file_crowd_cmc: {
          nama_file: null,
          base64: null,
        },
      };
      const res = await fetch(server + "/api/v1/career/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (res.ok) {
        const data = await res.json();
        setOpenModal(!openModal);
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
          nik_or_passport: "",
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          dob: "",
          sex: null,
          domicile_id: null,
          province: "",
          career_principal_id_first: null,
          career_principal_id_second: null,
          file_cv: {
            nama_file: "",
            base64: "",
          },
          file_reference: {
            nama_file: "",
            base64: "",
          },
        });
      } else {
        throw new Error("HTTP status " + res.status);
      }
    } catch (error) {
      setLoading(false);
      console.error("failed to submit form", error);
    }
  };

  return (
    <>
      {openModal && (
        <div className={styles.modal} onClick={() => setOpenModal(!openModal)}>
          <div className={styles.modalContent} onClick={preventModal}>
            <div
              className={styles.closeContainer}
              onClick={() => setOpenModal(!openModal)}
            >
              <Image
                src="/assets/icon-close.svg"
                height={20}
                width={20}
                alt="facebook"
              />
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <div className={styles.flexListContainer}>
                <div className={styles.flexList}>
                  <label htmlFor="nik_or_passport">
                    ID Number(NIK) / Passport Number
                  </label>
                  <input
                    className={styles.nik}
                    onChange={handleInputChange}
                    type="number"
                    id="nik_or_passport"
                    name="nik_or_passport"
                    value={formData.nik_or_passport}
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
                  />
                </div>
                <div className={styles.flexList}>
                  <label htmlFor="sex">Gender</label>
                  <select
                    className={styles.selectBox}
                    value={formData.sex || ""}
                    onChange={handleSelectChange}
                    id="sex"
                    name="sex"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value={1}>Laki-laki</option>
                    <option value={2}>Perempuan</option>
                  </select>
                </div>
              </div>
              <div className={styles.flexContainer}>
                <div className={styles.flexList}>
                  <label htmlFor="domicile_id">Domicile</label>
                  <select
                    className={styles.selectBox}
                    value={formData.domicile_id || ""}
                    onChange={handleSelectChange}
                    id="domicile_id"
                    name="domicile_id"
                    required
                  >
                    <option value="">Select Domicile</option>
                    {domicile?.data?.map((item) => (
                      <option key={item.id_domicile} value={item.id_domicile}>
                        {item.name_country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.flexList}>
                  <label htmlFor="province">Province</label>
                  <select
                    className={styles.selectBox}
                    value={formData.province || ""}
                    onChange={handleSelectChange}
                    id="province"
                    name="province"
                    required
                  >
                    <option value="">Select Province</option>
                    {data.map((item, i) => (
                      <option key={i} value={item.province}>
                        {item.province}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.flexListContainer}>
                <div className={styles.flexList}>
                  <label htmlFor="file_cv">Upload CV and Resume</label>
                  <input
                    className={styles.inputFile}
                    accept=".pdf, .doc, .docx"
                    type="file"
                    id="file_cv"
                    name="file_cv"
                    ref={cvRef}
                    placeholder="Browse"
                    required
                  />
                </div>
              </div>
              <div className={styles.flexListContainer}>
                <div className={styles.flexList}>
                  <label htmlFor="file_reference">Reference</label>
                  <input
                    className={styles.inputFile}
                    accept=".pdf, .doc, .docx"
                    type="file"
                    id="file_reference"
                    name="file_reference"
                    ref={referRef}
                    required
                  />
                </div>
              </div>
              <div className={styles.submitContainer}>
                <button className={styles.btnSubmit} type="submit">
                  {loading ? <div className={styles.loader}></div> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
