export const genderToInt = (gender) => {
  if (gender === "laki-laki") {
    return 1;
  } else if (gender === "perempuan") {
    return 0;
  } else {
    return -1; // Nilai default jika jenis kelamin tidak valid
  }
};
