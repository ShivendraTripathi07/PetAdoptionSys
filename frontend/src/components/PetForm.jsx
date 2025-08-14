import { useState } from "react";
import Api from "../common/index";
import axiosInstance from "../common/axiosInstance";
import toast from "react-hot-toast";
import uploadImage from "../common/uploadImage";

export default function PetForm({ onPetAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    vaccinated: false,
    baseFee: "",
    discountPercent: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedUrl = null;
      if (formData.image) {
        const res = await uploadImage(formData.image);
        uploadedUrl = res.secure_url;
      }

      const petData = {
        name: formData.name,
        species: formData.species,
        vaccinated: formData.vaccinated,
        baseFee: Number(formData.baseFee),
        discountPercent: Number(formData.discountPercent) || 0,
        images: uploadedUrl ? [uploadedUrl] : [],
      };

      await axiosInstance.post(Api.postPet.url, petData);
      toast.success("Pet added successfully!");
      onPetAdded(); // refresh pet list
      setFormData({
        name: "",
        species: "Dog",
        vaccinated: false,
        baseFee: "",
        discountPercent: "",
        image: null,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding pet");
    }
  };

  return (
    <form
      className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mb-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">Add New Pet</h2>
      <input
        type="text"
        name="name"
        placeholder="Pet Name"
        value={formData.name}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-3"
        required
      />

      <select
        name="species"
        value={formData.species}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-3"
        required
      >
        <option>Dog</option>
        <option>Cat</option>
        <option>Bird</option>
        <option>cow</option>
        <option>Other</option>
      </select>

      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          name="vaccinated"
          checked={formData.vaccinated}
          onChange={handleChange}
        />
        Vaccinated
      </label>

      <input
        type="number"
        name="baseFee"
        placeholder="Base Fee"
        value={formData.baseFee}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-3"
        required
      />

      <input
        type="number"
        name="discountPercent"
        placeholder="Discount (%)"
        value={formData.discountPercent}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-3"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Pet
      </button>
    </form>
  );
}
