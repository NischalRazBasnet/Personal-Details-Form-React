import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import { Table } from "./Table";
import { Link } from "react-router-dom";
const Home = ({ onAdd, initialData }) => {
  const countries = [
    "Afghanistan",
    "Brazil",
    "Canada",
    "China",
    "Egypt",
    "France",
    "India",
    "Japan",
    "Mexico",
    "Nepal",
    "Nigeria",
    "Russia",
    "South Africa",
    "United Kingdom",
    "United States",
    "Australia",
  ];

  const defaulCountry = "Nepal";

  const [userInput, setUserInput] = useState({
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dob: "",
    city: "",
    district: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phoneNo: "",
    };

    if (!userInput.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(userInput.name)) {
      newErrors.name = "Name must only conatian letters and spaces";
      valid = false;
    }

    if (!userInput.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(userInput.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!userInput.phoneNo.trim()) {
      newErrors.phoneNo = "Phone Number is required";
      valid = false;
    } else if (/^[0-9]+}$/.test(userInput.phoneNo)) {
      newErrors.phoneNo = "Phone number must contain only numbers";
      valid = false;
    } else if (userInput.phoneNo.length < 7) {
      newErrors.phoneNo = "Phone Numbers must be at least 7 digits";
      valid = false;
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      valid = false;
    }
    return valid;
  };

  useEffect(() => {
    if (isFormSubmitted) {
      window.location.reload();
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const formData = JSON.parse(localStorage.getItem("userInput")) || [];
      formData.push({ ...userInput, id: formData.length });
      localStorage.setItem("userInput", JSON.stringify(formData));

      setIsFormSubmitted(true);

      setUserInput({
        id: "",
        name: "",
        email: "",
        phoneNo: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: defaulCountry,
      });

      setErrors({
        name: "",
        email: "",
        phoneNo: "",
      });
    }
  };

  return (
    <div>
      <div className="container">
        <form method="post" className="form" onSubmit={handleFormSubmit}>
          <div className="fields">
            <div className="input-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={userInput.name}
                onChange={(e) => {
                  setUserInput({ ...userInput, name: e.target.value });
                }}
                required
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="input-field">
              <label>E-mail</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={userInput.email}
                onChange={(e) => {
                  setUserInput({ ...userInput, email: e.target.value });
                }}
                required
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input-field">
              <label>Phone No.</label>
              <input
                type="text"
                name="phoneNo"
                placeholder="Enter your phone no."
                value={userInput.phoneNo}
                onChange={(e) => {
                  setUserInput({ ...userInput, phoneNo: e.target.value });
                }}
                required
              />
              {errors.phoneNo && <div className="error">{errors.phoneNo}</div>}
            </div>
            <div className="input-field">
              <label>DOB</label>
              <input
                onChange={(e) => {
                  setUserInput({ ...userInput, dob: e.target.value });
                }}
                name="dob"
                type="date"
                placeholder="Enter birth date"
                required
              />
            </div>
          </div>

          <div className="address-container">
            <div className="address-heading">
              <label>Address</label>
            </div>

            <div className="address-fields">
              <div className="address-field">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Enter city name"
                  required
                  onChange={(e) => {
                    setUserInput({ ...userInput, city: e.target.value });
                  }}
                />
              </div>
              <div className="address-field">
                <label>District</label>
                <input
                  type="text"
                  placeholder="Enter your district"
                  onChange={(e) => {
                    setUserInput({ ...userInput, district: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="address-field">
                <label>Province</label>
                <select
                  onChange={(e) => {
                    setUserInput({ ...userInput, province: e.target.value });
                  }}
                  name="province"
                >
                  <option value="Koshi Province">Koshi Province</option>
                  <option value="Madesh Province">Madesh Province</option>
                  <option value="Bagmati Province">Bagmati Province</option>
                  <option value="Gandaki Province">Gandaki Province</option>
                  <option value="Lumbini Province">Lumbini Province</option>
                  <option value="KarnaliProvince">KarnaliProvince</option>
                  <option value="Sudhurpashchim Province">
                    Sudhurpashchim Province
                  </option>
                </select>
              </div>
              <div className="address-field">
                <label>Country</label>
                <select
                  id="countrySelector"
                  onChange={(e) => {
                    setUserInput({ ...userInput, country: e.target.value });
                  }}
                  value={userInput.country}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="btn">
            <button
              className="btn-submit"
              // type="submit"
            >
              Submit
            </button>
            &nbsp;
            <Link to={"/table"}>Show all data</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
