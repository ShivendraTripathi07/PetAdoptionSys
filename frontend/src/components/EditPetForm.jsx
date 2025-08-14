import { useState } from "react";
import uploadImage from "../common/uploadImage";
import Api from "../common/index";
import axiosInstance from "../common/axiosInstance";
import toast from "react-hot-toast";

export default function EditPetForm({ pet, onUpdated }) {
  const [formData, setFormData] = useState({
    name: pet.name,
    species: pet.species,
    vaccinated: pet.vaccinated,
    baseFee: pet.baseFee,
    discountPercent: pet.discountPercent,
    image: null,
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") setFormData((f) => ({ ...f, image: files[0] }));
    else if (type === "checkbox")
      setFormData((f) => ({ ...f, [name]: checked }));
    else setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedUrl = null;
      if (formData.image) {
        const res = await uploadImage(formData.image);
        uploadedUrl = res.secure_url;
      }

      const updates = {
        name: formData.name,
        species: formData.species,
        vaccinated: formData.vaccinated,
        baseFee: Number(formData.baseFee),
        discountPercent: Number(formData.discountPercent) || 0,
        images: uploadedUrl ? [uploadedUrl] : pet.images,
      };

      await axiosInstance.put(
        Api.updatePet.url.replace(":id", pet._id),
        updates
      );
      toast.success("Pet updated successfully!");
      onUpdated();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update pet");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mt-6"
    >
      <h2 className="text-lg font-semibold mb-4">Edit Pet</h2>
      <input
        type="text"
        name="name"
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
        value={formData.baseFee}
        onChange={handleChange}
        className="border rounded w-full p-2 mb-3"
        required
      />
      <input
        type="number"
        name="discountPercent"
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
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </form>
  );
}
