import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Button, FormLabel } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const [validation, setValidation] = useState({
    name: { error: false, message: "This field is required" },
    email: { error: false, message: "Enter your email" },
  });

  const handleSubmit = async () => {
    // Validation checks
    const checkValidation = {
      name: {
        error: !values.name.trim(),
        message: "Please enter your name",
      },
      email: {
        error: !values.email.trim(),
        message: "Please enter your email",
      },
    };

    setValidation(checkValidation);

    if (Object.values(checkValidation).some((field) => field.error)) {
      // There are validation errors
      return;
    }

    try {
      let { data, status } = await axios.post(
        "http://localhost:4000/newStudent",
        values
      );
      if (status) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to add student");
    }

    // axios
    //   .post("http://localhost:4000/newStudent", values)
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     toast.error("Failed to add student");
    //   });
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const isValidEmail = (email) => {
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (field, value) => {
    setValues({ ...values, [field]: value });

    // Show error message if the field is completely empty
    if (!value.trim()) {
      setValidation({
        ...validation,
        [field]: { error: true, message: "This field is required" },
      });
    } else if (field === "name" && !isValidName(value.trim())) {
      // Show error message if the name is not valid
      setValidation({
        ...validation,
        [field]: { error: true, message: "Enter a valid name" },
      });
    } else if (field === "email" && !isValidEmail(value.trim())) {
      // Show error message if the email is not valid
      setValidation({
        ...validation,
        [field]: { error: true, message: "Enter a valid email" },
      });
    } else {
      // Clear error message when the user starts typing
      setValidation({
        ...validation,
        [field]: { error: false, message: "This field is required" },
      });
    }
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{ backgroundColor: "gray" }}
    >
      <div className="w-50 bg-white rounded p-3">
        <Box>
          <h2>Add Student Data</h2>
          <div className="mb-2">
            <FormLabel>Name</FormLabel>
            <TextField
              type="text"
              fullWidth
              placeholder="Write your name here"
              value={values.name.trimStart()}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            {validation.name.error && (
              <p style={{ color: "red" }}>{validation.name.message}</p>
            )}
          </div>
          <div className="mb-2">
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              fullWidth
              placeholder="Write your email here"
              value={values.email.trimStart()}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {validation.email.error && (
              <p style={{ color: "red" }}>{validation.email.message}</p>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate("/")}
            >
              Close
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddStudent;
