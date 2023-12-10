import React, { useState } from "react";
import "../Styles/Table.css";
export const Table = () => {
  const formData = JSON.parse(localStorage.getItem("userInput")) || [];

  return (
    <div className="table-container">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Phone No.</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((data, index) => (
              <DataRow allData={formData} key={index} data={data} />
            ))}

            {formData.length <= 0 && (
              <tr>
                <td colSpan={9}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DataRow = ({ data, allData }) => {
  const deleteData = (data) => {
    let remaining = allData.filter((d) => d.id !== data.id);
    localStorage.setItem("userInput", JSON.stringify(remaining));
    window.location.reload();
  };

  const handleEdit = (data) => {
    let temp = allData.map((d) => {
      if (d.id === data.id) {
        return { ...data };
      }

      return d;
    });

    localStorage.setItem("userInput", JSON.stringify(temp));
    window.location.reload();
  };
  const [isEditing, setIsEditing] = useState(false);
  const [localCopy, setLocalCopy] = useState({ ...data });

  return (
    <tr className="data-row">
      {!isEditing && (
        <>
          <td>{localCopy.id + 1}</td>
          <td>{localCopy.name}</td>
          <td>{localCopy.email}</td>
          <td>{localCopy.phoneNo}</td>
          <td>{localCopy.city}</td>
          <td>{localCopy.district}</td>
          <td>{localCopy.province}</td>
          <td>{localCopy.country}</td>
        </>
      )}

      {isEditing && (
        <>
          <td>{localCopy.id + 1}</td>
          <td>
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, name: e.target.value });
              }}
              value={localCopy.name}
            />
          </td>
          <td>
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, email: e.target.value });
              }}
              value={localCopy.email}
            />
          </td>
          <td>
            {" "}
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, phoneNo: e.target.value });
              }}
              value={localCopy.phoneNo}
            />
          </td>
          <td>
            {" "}
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, city: e.target.value });
              }}
              value={localCopy.city}
            />
          </td>
          <td>
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, district: e.target.value });
              }}
              value={localCopy.district}
            />
          </td>
          <td>
            {" "}
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, province: e.target.value });
              }}
              value={localCopy.province}
            />
          </td>
          <td>
            {" "}
            <input
              onChange={(e) => {
                setLocalCopy({ ...localCopy, country: e.target.value });
              }}
              value={localCopy.country}
            />
          </td>
        </>
      )}

      <td className="actions">
        <div
          onClick={() => {
            deleteData(data);
          }}
          className="btn-delete"
        >
          <span class="material-symbols-outlined">Delete</span>
        </div>
        <div
          className="btn-edit"
          onClick={() => {
            if (isEditing) {
              handleEdit(localCopy);
            }

            setIsEditing((prev) => !prev);
          }}
        >
          <span class="material-symbols-outlined">
            {isEditing ? "Save" : "Edit"}
          </span>
        </div>
      </td>
    </tr>
  );
};
