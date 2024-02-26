import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./table.css";

const initialData = [
  {
    id: 1,
    name: "John Doe",
    date: "2024-02-08",
    address: "123 Main St, City, Country",
    course: "SQL",
    coupon: "W15",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "2024-02-10",
    address: "456 Elm St, Town, Country",
    course: "Python",
    coupon: "SF-24",
  },
  {
    id: 3,
    name: "Alice Johnson",
    date: "2024-02-12",
    address: "789 Oak St, Village, Country",
    course: "Python",
    coupon: "W15",
  },
  {
    id: 4,
    name: "Bob Williams",
    date: "2024-02-15",
    address: "101 Pine St, Hamlet, Country",
    course: "SQL",
    coupon: "SF-24",
  },
  {
    id: 5,
    name: "Eva Brown",
    date: "2024-02-18",
    address: "246 Maple St, Suburb, Country",
    course: "Ruby",
    coupon: "W15",
  },
  {
    id: 6,
    name: "Michael Lee",
    date: "2024-02-20",
    address: "369 Cedar St, Rural, Country",
    course: "Ruby",
    coupon: "MCL38",
  },
  {
    id: 7,
    name: "Sophia Garcia",
    date: "2024-02-22",
    address: "808 Birch St, Countryside, Country",
    course: "React",
    coupon: "RB20",
  },
  {
    id: 8,
    name: "David Martinez",
    date: "2024-02-24",
    address: "555 Walnut St, County, Country",
    course: "React",
    coupon: "MCL38",
  },
  {
    id: 9,
    name: "Olivia Rodriguez",
    date: "2024-02-26",
    address: "777 Oak St, Valley, Country",
    course: "HTML",
    coupon: "RB20",
  },
  {
    id: 10,
    name: "William Taylor",
    date: "2024-02-28",
    address: "888 Pine St, Mountains, Country",
    course: "HTML",
    coupon: "MCL38",
  },
];

export default function BasicTable() {
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [newRow, setNewRow] = useState({
    id: "",
    name: "",
    date: "",
    address: "",
    course: "",
    coupon: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showId, setShowId] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showCourse, setShowCourse] = useState(true);
  const [showCoupon, setShowCoupon] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    course: "",
    coupon: "",
    startDate: "",
    endDate: "",
  });

  const handleSelectRow = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleColumnVisibility = (columnName) => {
    switch (columnName) {
      case "id":
        setShowId(!showId);
        break;
      case "name":
        setShowName(!showName);
        break;
      case "date":
        setShowDate(!showDate);
        break;
      case "address":
        setShowAddress(!showAddress);
        break;
      case "course":
        setShowCourse(!showCourse);
        break;
      case "coupon":
        setShowCoupon(!showCoupon);
        break;
      default:
        break;
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedRow(data[index]);
  };

  const handleSave = () => {
    const newData = [...data];
    newData[editIndex] = editedRow;
    setData(newData);
    setEditIndex(-1);
    setEditedRow({});
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleAddRow = (e) => {
    e.preventDefault();
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newRowWithId = { ...newRow, id: newId };
    setData([...data, newRowWithId]);
    setNewRow({
      id: "",
      name: "",
      date: "",
      address: "",
      course: "",
      coupon: "",
    });
  };

  const handleFilter = () => {
    let filteredData = initialData.filter((row) => {
      let passesFilter = true;
      if (
        filters.name &&
        !row.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        passesFilter = false;
      }
      if (filters.course && row.course !== filters.course) {
        passesFilter = false;
      }
      if (filters.coupon && row.coupon !== filters.coupon) {
        passesFilter = false;
      }
      if (
        filters.startDate &&
        new Date(row.date) < new Date(filters.startDate)
      ) {
        passesFilter = false;
      }
      if (filters.endDate && new Date(row.date) > new Date(filters.endDate)) {
        passesFilter = false;
      }
      return passesFilter;
    });
    setData(filteredData);
  };

  return (
    <div className="container">
      <div className="form1">
        <form className="form" onSubmit={handleAddRow}>
          <TextField
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
            label="Name"
            variant="outlined"
            style={{ width: 225 }}
          />
          <TextField
            value={newRow.date}
            onChange={(e) => setNewRow({ ...newRow, date: e.target.value })}
            variant="outlined"
            type="date"
            style={{ width: 225 }}
          />
          <TextField
            value={newRow.address}
            onChange={(e) => setNewRow({ ...newRow, address: e.target.value })}
            label="Address"
            variant="outlined"
            style={{ width: 225 }}
          />
          <TextField
            select
            value={newRow.course}
            onChange={(e) => setNewRow({ ...newRow, course: e.target.value })}
            label="Course"
            variant="outlined"
            style={{ width: 225 }}
          >
            <MenuItem value="SQL">SQL</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Ruby">Ruby</MenuItem>
            <MenuItem value="HTML">HTML</MenuItem>
          </TextField>

          <TextField
            select
            value={newRow.coupon}
            onChange={(e) => setNewRow({ ...newRow, coupon: e.target.value })}
            label="Coupon"
            variant="outlined"
            style={{ width: 225 }}
          >
            <MenuItem value="RB20">RB20</MenuItem>
            <MenuItem value="W15">W15</MenuItem>
            <MenuItem value="SF-24">SF-24</MenuItem>
            <MenuItem value="MCL38">MCL38</MenuItem>
          </TextField>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>

      <div className="filters">
        <TextField
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          label="Name"
          variant="outlined"
          style={{ width: 225 }}
        />
        <TextField
          select
          label="Course"
          value={filters.course}
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
          variant="outlined"
          style={{ width: 225 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="SQL">SQL</MenuItem>
          <MenuItem value="Python">Python</MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Ruby">Ruby</MenuItem>
          <MenuItem value="HTML">HTML</MenuItem>
        </TextField>
        <TextField
          select
          label="Coupon"
          value={filters.coupon}
          onChange={(e) => setFilters({ ...filters, coupon: e.target.value })}
          variant="outlined"
          style={{ width: 225 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="RB20">RB20</MenuItem>
          <MenuItem value="W15">W15</MenuItem>
          <MenuItem value="SF-24">SF-24</MenuItem>
          <MenuItem value="MCL38">MCL38</MenuItem>
        </TextField>
        <TextField
          label="Start Date"
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ width: 225 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          style={{ width: 225 }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter}>
          Filter
        </Button>
      </div>

      <div className="column-toggles">
        <label>
          <input
            type="checkbox"
            checked={showId}
            onChange={() => setShowId(!showId)}
          />
          ID
        </label>
        <label>
          <input
            type="checkbox"
            checked={showName}
            onChange={() => setShowName(!showName)}
          />
          Name
        </label>
        <label>
          <input
            type="checkbox"
            checked={showDate}
            onChange={() => setShowDate(!showDate)}
          />
          Date
        </label>
        <label>
          <input
            type="checkbox"
            checked={showAddress}
            onChange={() => setShowAddress(!showAddress)}
          />
          Address
        </label>
        <label>
          <input
            type="checkbox"
            checked={showCourse}
            onChange={() => setShowCourse(!showCourse)}
          />
          Course
        </label>
        <label>
          <input
            type="checkbox"
            checked={showCoupon}
            onChange={() => setShowCoupon(!showCoupon)}
          />
          Coupon
        </label>
      </div>

      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < data.length
                    }
                    checked={selectAll}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all rows" }}
                  />
                </TableCell>
                {showId && <TableCell>ID</TableCell>}
                {showName && <TableCell>Name</TableCell>}
                {showDate && <TableCell>Date</TableCell>}
                {showAddress && <TableCell>Address</TableCell>}
                {showCourse && <TableCell>Course</TableCell>}
                {showCoupon && <TableCell>Coupon</TableCell>}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.indexOf(row.id) !== -1}
                      onChange={() => handleSelectRow(row.id)}
                      inputProps={{
                        "aria-labelledby": `enhanced-table-checkbox-${index}`,
                      }}
                    />
                  </TableCell>
                  {showId && <TableCell>{row.id}</TableCell>}
                  {showName && (
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          value={editedRow.name}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.name
                      )}
                    </TableCell>
                  )}
                  {showDate && (
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          type="date"
                          value={editedRow.date}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              date: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.date
                      )}
                    </TableCell>
                  )}
                  {showAddress && (
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          value={editedRow.address}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              address: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.address
                      )}
                    </TableCell>
                  )}
                  {showCourse && (
                    <TableCell>
                      {editIndex === index ? (
                        <Select
                          value={editedRow.course}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              course: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="SQL">SQL</MenuItem>
                          <MenuItem value="Python">Python</MenuItem>
                          <MenuItem value="React">React</MenuItem>
                          <MenuItem value="Ruby">Ruby</MenuItem>
                          <MenuItem value="HTML">HTML</MenuItem>
                        </Select>
                      ) : (
                        row.course
                      )}
                    </TableCell>
                  )}
                  {showCoupon && (
                    <TableCell>
                      {editIndex === index ? (
                        <Select
                          value={editedRow.coupon}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              coupon: e.target.value,
                            })
                          }
                        >
                          <MenuItem value="RB20">RB20</MenuItem>
                          <MenuItem value="W15">W15</MenuItem>
                          <MenuItem value="SF-24">SF-24</MenuItem>
                          <MenuItem value="MCL38">MCL38</MenuItem>
                        </Select>
                      ) : (
                        row.coupon
                      )}
                    </TableCell>
                  )}

                  <TableCell>
                    {editIndex === index ? (
                      <IconButton onClick={handleSave} aria-label="save">
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleEdit(index)}
                          aria-label="edit"
                          style={{ color: "blue" }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(index)}
                          aria-label="delete"
                          style={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
