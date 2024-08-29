/* eslint-disable react/prop-types */
import { useState } from "react";

const UserInfoForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [profession, setProfession] = useState("");

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, photo, profession });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profession"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />
      <input type="file" onChange={handlePhotoChange} />
      <button type="submit">Next</button>
    </form>
  );
};

export default UserInfoForm;
