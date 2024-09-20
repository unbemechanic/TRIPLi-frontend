import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataControl,
  DataList,
  DeleteButtonDiv,
  EditButtonDiv,
  FileInput,
  FilterButton,
  Input,
  InputsDiv,
  ScrollSec,
  Table,
  TableRow,
  UpdateButton,
  UpdateInputs,
} from "../style";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { CampingAddModal } from "../modal";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import SearchIcon from "@mui/icons-material/Search";

const CampingData = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [contact, setContact] = useState();
  const [from, setfrom] = useState();
  const [to, setTo] = useState();
  const [website, setWebsite] = useState();
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [newName, setNewName] = useState();
  const [newCity, setNewCity] = useState();
  const [newContact, setNewContact] = useState();
  const [newfrom, setNewfrom] = useState();
  const [newto, setNewto] = useState();
  const [newWebsite, setNewWebsite] = useState();
  const [newLatitude, setNewLatitude] = useState();
  const [newLongitude, setNewLongitude] = useState();
  const [update, setUpdate] = useState(Array(data.length).fill(false));

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5500/camping", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching data 'frontend'");
      }
      const motor = await response.json();
      setData(motor);
      setFilteredData(motor);
      console.log(motor);
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "") {
      try {
        const res = await fetch("http://localhost:5500/camping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name,
            city,
            contact,
            from,
            to,
            website,
            latitude,
            longitude
          }),
        });
        if (res.ok) {
          fetchData();
          setName("");
        }else{
          console.log('res is not ok')
        }
      } catch (error) {
        console.error("failure", error);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5500/camping/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          newName,
          newCity,
          newContact,
          newfrom,
          newto,
          newWebsite,
          newLatitude,
          newLongitude,
        }),
      });
      if (res.ok) {
        console.log("done");
      } else {
        console.log("failed res is not ok");
      }
      console.log(newName);
      setNewName("");
      fetchData();
    } catch (error) {
      console.error("error editing");
    }
  };

  const handleClick = (index) => {
    const newEditMode = [...update];
    newEditMode[index] = !newEditMode[index];
    setUpdate(newEditMode);
  };
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5500/camping/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        console.log("Data deleted successfully");
        fetchData();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //filter//
  const handleSearch = (query) => {
    if (query && typeof query === "string") {
      const filtered = Array.isArray(data)
        ? data.filter((place) => {
            return (
              place.name &&
              typeof place.name === "string" &&
              place.name.toLowerCase().includes(query.toLowerCase())
            );
          })
        : [];
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };
  return (
    <div>
      <DataList className="tablet">
        <DataControl>
          <h2>Camping places</h2>
          <InputsDiv>
            <Input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Type to search..."
            />
            <SearchIcon />
          </InputsDiv>
          <FilterButton>
            <SortOutlinedIcon /> Filter
          </FilterButton>
          <CampingAddModal
            onSubmit={handleSubmit}
            names={{
              name,
              city,
              contact,
              from,
              to,
              website,
              latitude,
              longitude,
            }}
            handlers={{
              onClick: handleChange(setName),
              onCompany: handleChange(setCity),
              onLicense: handleChange(setContact),
              onPassanger: handleChange(setfrom),
              onCost: handleChange(setTo),
              onDate: handleChange(setWebsite),
              onType: handleChange(setLatitude),
              onRating: handleChange(setLongitude),
            }}
          />
        </DataControl>
        <ScrollSec>
          <Table>
            <TableRow
              $camping
              style={{ position: "sticky", top: "0", backgroundColor: "white" }}
            >
              <th /* style={{paddingRight:'70px'}} */>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>City</th>
              <th>Contact</th>
              <th>Working hours</th>
              <th>Website</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Edit/Delete</th>
            </TableRow>
            {filteredData.map((value, index) => {
              return (
                <TableRow
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#d8d8d836" : "white",
                  }}
                  $campingTable
                >
                  {update[index] ? (
                    <>
                      <td>{index + 1}</td>
                      <td>
                        <FileInput type="file" />
                      </td>
                      <td>
                        <UpdateInputs
                          type="text"
                          name="name"
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder={value.name}
                        />
                      </td>
                      <td>
                        <UpdateInputs
                          type="text"
                          name="company"
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder={value.city}
                        />
                      </td>
                      <td>
                        <UpdateInputs
                          type="text"
                          name="license"
                          onChange={(e) => setNewContact(e.target.value)}
                          placeholder={value.contact}
                        />
                      </td>
                      <td>
                        <UpdateInputs
                          type="text"
                          name="passanger"
                          onChange={(e) => setNewfrom(e.target.value)}
                          placeholder={value.from}
                        />
                      </td>
                      <td>
                        <UpdateInputs
                          type="number"
                          name="cost"
                          onChange={(e) => setNewto(e.target.value)}
                          placeholder={value.to}
                        />
                      </td>
                      <td>
                        <UpdateInputs
                          type="text"
                          name="type"
                          onChange={(e) => setNewWebsite(e.target.value)}
                          placeholder={value.website}
                        />
                      </td>

                      <td>
                        <UpdateInputs
                          type="number"
                          name="rating"
                          onChange={(e) => setNewLatitude(e.target.value)}
                          placeholder={value.latitude}
                        />
                      </td>
                      <td>
                        <UpdateInputs
                          type="text"
                          name="location"
                          onChange={(e) => setNewLongitude(e.target.value)}
                          placeholder={value.longitude}
                        />
                      </td>
                      <td>
                        <UpdateButton
                          onClick={(e) => {
                            handleEdit(value._id);
                            handleClick(index);
                          }}
                        >
                          <SaveAsOutlinedIcon />
                        </UpdateButton>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ paddingLeft: "10px" }}>{index + 1}</td>
                      <td>
                        {/* <img src={value.photo} alt="" width={50}/> */}
                        <div>Photo</div>
                      </td>
                      <td>{value.name}</td>
                      <td>{value.company || "no city"}</td>
                      <td>{value.license || "no contact"}</td>
                      <td>{value.passanger || "no working"}-</td>
                      <td>{value.cost || "no working"}</td>
                      <td>{value.type || "no website"}</td>
                      <td>{value.date || " no latitude"}</td>
                      <td>{value.rating || " not longitude"}</td>
                      {/* <td>{value.location}</td> */}
                      <td style={{ display: "flex", gap: "10px" }}>
                        <EditButtonDiv onClick={() => handleClick(index)}>
                          <EditIcon sx={{ fill: "white" }} />
                        </EditButtonDiv>
                        <DeleteButtonDiv
                          onClick={() => handleDelete(value._id)}
                        >
                          <DeleteIcon sx={{ fill: "white" }} />
                        </DeleteButtonDiv>
                      </td>
                    </>
                  )}
                </TableRow>
              );
            })}
          </Table>
        </ScrollSec>
      </DataList>
    </div>
  );
};

export default CampingData;
