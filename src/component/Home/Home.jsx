import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { toast } from "react-toastify";
import "./home.scss";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const [data, setData] = useState([]);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    // tableData();
    axios
      .get("http://localhost:4000/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const tableData = async () => {
    axios
      .get("http://localhost:4000/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:4000/delete/" + id)
      .then((res) => {
        setData(data.filter((item) => item._id !== id));
        toast.success("Student deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add student");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "gray" }}
    >
      <div className="w-50 bg-white rounded p-3">
        <h2 className="d-flex justify-content-center">Student List</h2>
        <div className="d-flex justify-content-end" style={{ padding: "10px" }}>
          <Link to={"/create"}>
            <Button variant="contained" color="success">
              + Add New
            </Button>
          </Link>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">EMAIL</StyledTableCell>
                <StyledTableCell align="center">ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="center">{item.name}</StyledTableCell>
                  <StyledTableCell align="center">{item.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <Link to={`/edit/${item._id}`}>
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setDeleteId(item._id);
                          setShowDeletePopup(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showDeletePopup && (
          <Dialog open={showDeletePopup} className="smallModel">
            <div>
              <DialogContent>
                Do you want to delete ?
              </DialogContent>
              <DialogActions>
                <Button
                  className="border-button"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setShowDeletePopup(false);
                  }}
                >
                  No
                </Button>
                <Button
                  className="button"
                  variant="contained"
                  onClick={()=>{
                    handleDelete(deleteId);
                    setShowDeletePopup(false)
                  }}
                >
                  Yes
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Home;
