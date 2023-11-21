import React, { useState } from "react";
import clienteAxios from "../axios/clienteAxios.js";

const InfoUser = ({ user }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleRoleChange = (e) => {
    setEditedUser({
      ...editedUser,
      role: e.target.value,
    });
  };

  const handleAdminChange = (e) => {
    setEditedUser({
      ...editedUser,
      admin: e.target.checked,
    });
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const userId = editedUser._id;

    try {
      const { data } = await clienteAxios.put(
        `/users/update-user/${userId}`,
        { editedUser },
        config
      );
      console.log("Data", data);
    } catch (error) {
      console.log(error);
    }

    console.log("Usuario editado:", editedUser);
  };

  return (
    <div className="bg-gray-200 p-4  rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Información del Usuario</h2>
      <p className="mt-2">
        <span className="font-semibold ">Nombre:</span> {editedUser.nombre}
      </p>
      <p className="mt-2">
        <span className="font-semibold ">Apellido:</span> {editedUser.apellido}
      </p>
      <p className="mt-2">
        <span className="font-semibold ">Email:</span> {editedUser.email}
      </p>
      <label className="flex mt-2 gap-6 items-center ">
        <span className="font-semibold">Rol:</span>
        <select
          value={editedUser.role}
          onChange={handleRoleChange}
          className=" border border-gray-300 rounded-md mt-1"
        >
          <option value="user">User</option>
          <option value="premium">Premium</option>
        </select>
      </label>
      <label className="block mb-2">
        <span className="font-semibold">Admin:</span>{" "}
        <input
          type="checkbox"
          checked={editedUser.admin}
          onChange={handleAdminChange}
          className="ml-2"
        />
      </label>
      <button
        onClick={handleSaveChanges}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default InfoUser;
