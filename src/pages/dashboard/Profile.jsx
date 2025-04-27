import { useUser } from "@/context/UserContext";
import { updateDatas } from "@/hooks/AuthHandles";
import { profileSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { PHOTO } from "@/lib/api";
import { X } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useUser() || {};
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userSubscription = user?.subscription || null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone?.toString() || "",
      profilePicture: user?.profilePicture || null, // Ensure profilePicture is included
    },
  });

  useEffect(() => {
    // If the user already has a profile picture, set the preview
    if (user?.profilePicture) {
      const imageUrl = user.profilePicture.includes("https://api.dicebear.com")
        ? user.profilePicture
        : `${PHOTO}${user.profilePicture}`;
      setPreviewImage(imageUrl);
    }
  }, [user]);

  const onSubmit = async (data) => {
    const { name, email, phone, profilePicture } = data;
    const updateData = {
      name,
      email,
      phone,
    };
    await updateDatas(
      updateData,
      profilePicture?.[0],
      setUser,
      setIsSubmitting
    );
    setIsEditing(false); // Disable editing after submission
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue("profilePicture", e.target.files); // Update file inside react-hook-form
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Profile Settings
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            <strong>Status:</strong>{" "}
            {userSubscription?.isActive ? "Active" : "Inactive"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Plan:</strong> {userSubscription?.plan || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Started At:</strong>{" "}
            {new Date(userSubscription?.startedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-800">
            Name
          </label>
          <input
            disabled={!isEditing}
            type="text"
            {...register("name")}
            placeholder="Enter your name"
            className={`w-full px-4 py-3 border rounded-lg transition duration-300 
              ${isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"} 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-800">
            Email
          </label>
          <input
            disabled={!isEditing}
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 border rounded-lg transition duration-300 
              ${isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"} 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-800">
            Phone
          </label>
          <input
            disabled={!isEditing}
            type="number"
            {...register("phone")}
            placeholder="Enter your phone number"
            className={`w-full px-4 py-3 border rounded-lg transition duration-300 
              ${isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"} 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-4 relative">
          <label className="block text-sm font-semibold text-gray-800">
            Profile Picture
          </label>

          <div className="relative">
            <input
              disabled={!isEditing}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
              className={`w-full px-4 py-3 border rounded-lg transition duration-300 
        ${isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"} 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />

            {/* Only show the close button inside the input box if an image has been selected */}
            {previewImage && (
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => {
                  setPreviewImage(null);
                  setValue("profilePicture", null); // Reset the file input in react-hook-form
                }}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 p-2  text-primary rounded-full  transition duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Preview image */}
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isEditing && (
            <button
              type="submit"
              className="w-full py-3 bg-[#59599B] text-white rounded-md font-semibold hover:bg-[#59599B]/80 transition duration-300 cursor-pointer"
            >
              {isSubmitting ? "Updating Profile..." : "Update Profile"}
            </button>
          )}
          {!isEditing && (
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              type="button"
              className="w-full py-3 bg-[#59599B] text-white rounded-md font-semibold hover:bg-[#59599B]/80 cursor-pointer transition duration-300"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
