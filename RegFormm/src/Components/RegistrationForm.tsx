import styles from "./RegistrationForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type Inputs = {
  name: string;
  surName: string;
  email: string;
  phoneNumber: number;
  password: string;
  personalIdNumber: string;
  profilePhoto: FileList;
  city: string;
  district: string;
  profession: string;
};

function RegistrationForm() {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [finishedRegistration, setFinishedRegistration] =
    useState<boolean>(false);
  const [regData, setRegData] = useState<Inputs | null>(null);
  const [districtOptions, setDistrictOptions] = useState<string[]>([
    "საბურთალო",
    "ვაკე",
    "მთაწმინდა",
    "ორთაჭალა",
    "კრწანისი",
  ]);

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<Inputs>();

  const emailValidationRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (Object.keys(formState.errors).length === 0) {
      // ვალიდაციის შეცდომები არ არის, ფორმის გაგზავნა შესაძლებელია
      setFinishedRegistration(true);
      setRegData(data);
    } else {
      // არის ვალიდაციის შეცდომები, ფორმის გაგზავნა შეუძლებელია
      setFinishedRegistration(false);
      console.log("Form contains errors:", formState.errors);
    }
  };
  console.log(regData);

  ///
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;

    // Update the district options based on the selected city
    if (selectedCity === "თბილისი") {
      setDistrictOptions([
        "საბურთალო",
        "ვაკე",
        "მთაწმინდა",
        "ორთაჭალა",
        "კრწანისი",
      ]);
    } else if (selectedCity === "თელავი") {
      setDistrictOptions(["თელავის ქუჩა 1", "თელავის ქუჩა 2"]);
    } else if (selectedCity === "ბათუმი") {
      setDistrictOptions(["ბათუმის ქუჩა 12", "ბათუმის ქუჩა 23"]);
    } else if (selectedCity === "ქუთაისი") {
      setDistrictOptions([
        "ქუთაისის ქუჩა 12",
        "ქუთაისის ქუჩა 23",
        "ქუთაისის ქუჩა 3",
      ]);
    } else if (selectedCity === "რუსთავი") {
      setDistrictOptions([
        "რუსთავის ქუჩა 132",
        "რუსთავის ქუჩა 23ბ",
        "რუსთავის ქუჩა 37",
      ]);
    } else {
      setDistrictOptions([]);
    }
  };

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.registrationForm}>
          {finishedRegistration ? (
            <div className={styles.finishedRegistration}>
              <div className={styles.profileContainer}>
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="userImg"
                    className={styles.userImg}
                  />
                </div>
                <p className={styles.info}>{regData?.name}</p>
                <p className={styles.info}>{regData?.surName}</p>
                <p className={styles.info}>{regData?.phoneNumber}</p>
                <p className={styles.info}>{regData?.email}</p>
                <p className={styles.info}>{regData?.profession}</p>
                <p className={styles.info}>{regData?.city}</p>
                <p className={styles.info}>{regData?.district}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="name">სახელი</label>
                </div>
                <input
                  type="text"
                  id="name"
                  className={`${styles.formInput} ${
                    errors.name?.message && styles.inputError
                  }`}
                  {...register("name", {
                    required: "აუცილებელი ველი",
                    minLength: { message: "მინიმუმ 2 ასო", value: 2 },
                    pattern: {
                      value: /^[\u10A0-\u10FF]+$/,
                      message: "მხოლოდ ქართული ასოები",
                    },
                  })}
                />
                {errors.name?.message && (
                  <p className={styles.errorMessages}>{errors.name.message}</p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="surName">გვარი</label>
                </div>
                <input
                  type="text"
                  id="surName"
                  className={`${styles.formInput} ${
                    errors.surName?.message && styles.inputError
                  }`}
                  {...register("surName", {
                    required: "აუცილებელი ველი",
                    minLength: { message: "მინიმუმ 5 ასო", value: 5 },
                    pattern: {
                      value: /^[\u10A0-\u10FF]+$/,
                      message: "მხოლოდ ქართული ასოები",
                    },
                  })}
                />
                {errors.surName?.message && (
                  <p className={styles.errorMessages}>
                    {errors.surName?.message}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="personalIdNumber">პირადი ნომერი</label>
                </div>
                <input
                  type="number"
                  id="personalIdNumber"
                  className={`${styles.formInput} ${
                    errors.personalIdNumber?.message && styles.inputError
                  }`}
                  {...register("personalIdNumber", {
                    required: "აუცილებელი ველი",
                    minLength: { message: "ფორმატი არავალიდურია", value: 11 },
                    maxLength: { message: "ფორმატი არავალიდურია", value: 11 },
                  })}
                />
                {errors.personalIdNumber?.message && (
                  <p className={styles.errorMessages}>
                    {errors.personalIdNumber?.message}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="email">იმეილი</label>
                </div>
                <input
                  type="text"
                  id="email"
                  className={`${styles.formInput} ${
                    errors.email?.message && styles.inputError
                  }`}
                  {...register("email", {
                    required: "აუცილებელი ველი",
                    pattern: {
                      value: emailValidationRegex,
                      message: "ფორმატი არავალიდურია",
                    },
                  })}
                />
                {errors.email?.message && (
                  <p className={styles.errorMessages}>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="phoneNumber">ტელეფონის ნომერი</label>
                </div>
                <input
                  type="number"
                  id="phoneNumber"
                  className={`${styles.formInput} ${
                    errors.phoneNumber?.message && styles.inputError
                  }`}
                  {...register("phoneNumber", {
                    required: "აუცილებელი ველი",
                    minLength: { message: "ფორმატი არავალიდურია", value: 9 },
                    maxLength: { message: "ფორმატი არავალიდურია", value: 9 },
                  })}
                />
                {errors.phoneNumber?.message && (
                  <p className={styles.errorMessages}>
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="password">პაროლი</label>
                </div>
                <div className={styles.relative}>
                  <input
                    type={seePassword ? "text" : "password"}
                    id="password"
                    className={`${styles.formInput} ${
                      errors.password?.message && styles.inputError
                    }`}
                    {...register("password", {
                      required: "აუცილებელი ველი",
                      minLength: { message: "მინიმუმ 8 სიმბოლო", value: 8 },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/,
                        message:
                          "პაროლისთვის გამოიყენე მინ. 8 სიმბოლო, მინ.ერთი დიდი და პატარა ლათინური ასო და ერთი ციფრი",
                      },
                    })}
                  />

                  <div
                    className={styles.iconContainer}
                    onClick={handleSeePassword}
                  >
                    {!seePassword ? (
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className={styles.faEyeSlash}
                      />
                    ) : (
                      <FontAwesomeIcon icon={faEye} className={styles.faEye} />
                    )}
                  </div>
                </div>
                {errors.password?.message && (
                  <p
                    className={`${styles.errorMessages} ${styles.passwordErrorMessage}`}
                  >
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="city">ქალაქი</label>
                </div>
                <select
                  id="city"
                  className={`${styles.formInput} ${
                    errors.city?.message && styles.inputError
                  }`}
                  {...register("city", {
                    required: "აუცილებელი ველი",
                  })}
                  defaultValue="თბილისი"
                  onChange={handleCityChange}
                >
                  <option value="თბილისი">თბილისი</option>
                  <option value="ბათუმი">ბათუმი</option>
                  <option value="ქუთაისი">ქუთაისი</option>
                  <option value="რუსთავი">რუსთავი</option>
                  <option value="თელავი">თელავი</option>
                  {/* Add more cities as needed */}
                </select>
                {errors.city?.message && (
                  <p className={styles.errorMessages}>{errors.city?.message}</p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="district">უბანი</label>
                </div>
                <select
                  id="district"
                  className={`${styles.formInput} ${
                    errors.district?.message && styles.inputError
                  }`}
                  {...register("district", { required: "აუცილებელი ველი" })}
                  defaultValue="საბურთალო"
                >
                  {districtOptions.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district?.message && (
                  <p className={styles.errorMessages}>
                    {errors.district?.message}
                  </p>
                )}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.labelContainer}>
                  <label htmlFor="profession">აირჩიე პროფესია</label>
                </div>
                <select
                  id="profession"
                  className={`${styles.formInput} ${
                    errors.profession?.message && styles.inputError
                  }`}
                  {...register("profession", {
                    required: "აუცილებელი ველი",
                  })}
                >
                  <option value="მალიარი">მალიარი</option>
                  <option value="კაფელ-მეტლახის ხელოსანი">
                    კაფელ-მეტლახის ხელოსანი
                  </option>
                  <option value="ელექტრიკოსი">ელექტრიკოსი</option>
                  <option value="სანტექნიკი">სანტექნიკი</option>
                  <option value="თაბაშირ-მუყაოს ხელოსანი">
                    თაბაშირ-მუყაოს ხელოსანი
                  </option>
                  <option value="გათბობა/გაგრილების სისტემის ხელოსანი">
                    გათბობა/გაგრილების სისტემის ხელოსანი
                  </option>
                  <option value="მეტალო-პლასტმასის კარ/ფანჯრის ხელოსანი">
                    მეტალო-პლასტმასის კარ/ფანჯრის ხელოსანი
                  </option>
                  <option value="სახლის დამლაგებელი">სახლის დამლაგებელი</option>
                  <option value="იატაკის სამუშაოები">იატაკის სამუშაოები</option>
                  <option value="სახურავის სპეციალისტი">
                    სახურავის სპეციალისტი
                  </option>
                  <option value="დამხმარე(მუშა)">დამხმარე(მუშა)</option>
                  <option value="უნივერსალური ხელოსანი">
                    უნივერსალური ხელოსანი
                  </option>
                  <option value="მშენებელი">მშენებელი</option>
                  <option value="ავეჯის ხელოსანი">ავეჯის ხელოსანი</option>
                  <option value="სამშენებლო სპეცტექნიკა">
                    სამშენებლო სპეცტექნიკა
                  </option>
                  <option value="ელ-შემდუღებელი">ელ-შემდუღებელი</option>
                  <option value="არქიტექტორი">არქიტექტორი</option>
                  <option value="ხის კარის ხელოსანი">ხის კარის ხელოსანი</option>
                  {/* Add more cities as needed */}
                </select>
                {errors.city?.message && (
                  <p className={styles.errorMessages}>
                    {errors.profession?.message}
                  </p>
                )}
              </div>

              <button type="submit" className={styles.btn}>
                რეგისტრაცია
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default RegistrationForm;
