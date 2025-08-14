import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../common/axiosInstance";
import Input from "../components/Input";
import Button from "../components/Button";
import uploadImage from "../common/uploadImage";
import Api from "../common";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      toast.loading("Uploading image...", { id: "upload" });

      const res = await uploadImage(file);
      if (res.secure_url) {
        setForm((prev) => ({ ...prev, profilePic: res.secure_url }));
        toast.success("Image uploaded!", { id: "upload" });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (err) {
      toast.error(err.message || "Error uploading image", { id: "upload" });
    } finally {
      setLoading(false);
    }
  };

  // Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.profilePic) {
      return toast.error("Please upload a profile picture");
    }

    setLoading(true);
    try {
      await axiosInstance.post(Api.signup.url, form);
      toast.success("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        <Input
          label="Name"
          name="name" // ✅ matches form state key
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Profile Picture Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {form.profilePic && (
            <img
              src={form.profilePic}
              alt="Profile Preview"
              className="mt-3 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>

        <Button type="submit" text="Signup" loading={loading} />
      </form>
    </div>
  );
}
