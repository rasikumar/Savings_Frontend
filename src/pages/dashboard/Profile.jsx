import { useUser } from "@/context/UserContext";
import { updateDatas } from "@/hooks/AuthHandles";
import { useState } from "react";

const Profile = () => {
  const { setUser } = useUser() || {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent to the backend
    const updateData = {
      name,
      email,
      phone,
    };

    // Call the updateProfile function and pass the data along with the image file
    await updateDatas(updateData, profilePicture, setUser);

  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <label>
        Profile Picture:
        <input type="file" onChange={handleImageChange} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
