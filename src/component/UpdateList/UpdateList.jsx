import { Box, Button, FormLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateList = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const [validation, setValidation] = useState({
    name: { error: false, message: "This field is required" },
    email: { error: false, message: "Enter your email" },
  });

  const isValidEmail = (email) => {
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleUpdateList = () => {
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
    axios
      .put("http://localhost:4000/updateStudent/" + id, values)
      .then((res) => {
        console.log(res);
        toast.success("Student updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add student");
      });
  };

  const handleInputChange = (field, value) => {
    setValues({ ...values, [field]: value });

    // Show error message if the field is completely empty
    if (!value.trim()) {
      setValidation({
        ...validation,
        [field]: { error: true, message: "This field is required" },
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

  useEffect(() => {
    axios
      .get("http://localhost:4000/singleStudent/" + id)
      .then((res) => {
        setValues({
          ...values,
          name: res.data[0].name,
          email: res.data[0].email,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{ backgroundColor: "gray" }}
    >
      <div className="w-50 bg-white rounded p-3">
        <Box>
          <h2>Update Student Data</h2>
          <div className="mb-2">
            <FormLabel>Name</FormLabel>
            <TextField
              type="text"
              fullWidth
              placeholder="Write your name here"
              value={values.name.trimStart()}
              // onChange={(e) => {
              //   setValues({ ...values, name: e.target.value });
              // }}
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
              // onChange={(e) => {
              //   setValues({ ...values, email: e.target.value });
              // }}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            {validation.email.error && (
              <p style={{ color: "red" }}>{validation.email.message}</p>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateList}
            >
              Update
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

export default UpdateList;
