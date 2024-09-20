import React, { useEffect, useState } from "react";
import axios from "axios";
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
import MotorAddModal, { UserAddModal } from "../modal";
import UpdateIcon from "@mui/icons-material/Update";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import SearchIcon from "@mui/icons-material/Search";

const UserData = () => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);

  const fetchData = async () => {
    try {
      // console.log("checking if token is alright",token)
      const response = await fetch("http://localhost:5500/sign-up", {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(!response.ok){
        throw new Error("Error fetching data 'frontend'")
      }
      const user = await response.json();
      setData(user)
      setFilteredData(user)
      console.log(user) 
      
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [token]);

  //filter
  const handleSearch = (query) => {
    if(query && typeof query === "string"){
      const filtered = Array.isArray(data) ? data.filter((user) => {
       return user.name && typeof user.name === "string" && user.name.toLowerCase().includes(query.toLowerCase()); 
      }) : [];
    setFilteredData(filtered);
    console.log("search is working", filtered);
    }else{
      setFilteredData(data)
      console.log('query is not filtering')
    }
    
  };
  //filter ends

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:5500/user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });

        if (response.ok) {
            console.log('Data deleted successfully');
            fetchData();
        } else {
            const errorData = await response.json();
            console.error('Failed to delete data:', errorData.message || response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div>
      <DataList $userlist className="tablet">
        <DataControl $userlist>
          <h2>User list</h2>
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
        </DataControl>
        <ScrollSec>
          <Table>
            <TableRow $user
              style={{ position: "sticky", top: "0", backgroundColor: "white" }}
            >
              <th /* style={{paddingRight:'70px'}} */>No.</th>
              <th>User image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Delete</th>
            </TableRow>
            {filteredData.map((value, index) => {
              return (
                <TableRow $user key={value._id} style={{backgroundColor: index % 2 === 0 ? '#d8d8d836' :'white'}}>
                    <>
                      <td style={{ paddingLeft: "10px" }}>{index + 1}</td>
                      <td>
                        {/* <img src={value.photo} alt="" width={50}/> */}
                        <div>User photo</div>
                      </td>
                      <td>{value.name}</td>
                      <td style={{display:'flex',boxSizing:'border-box', marginLeft:'90px'}}>{value.email || "no data"}</td>
                      <td style={{ display: "flex", gap: "10px", justifyContent:'center' }}>
                        <DeleteButtonDiv
                          onClick={() => {handleDelete(value._id); console.log("id hsould be deleted",value._id)}}
                        >
                          <DeleteIcon sx={{ fill: "white" }} />
                        </DeleteButtonDiv>
                      </td>
                    </>
                </TableRow>
              );
            })}
          </Table>
        </ScrollSec>
      </DataList>
    </div>
  );
};

export default UserData;
