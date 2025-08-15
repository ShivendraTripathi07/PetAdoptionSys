import { useState } from "react";
import { Edit3, Save, X } from "lucide-react";
import axiosInstance from "../common/axiosInstance";
import Api from "../common/index";
import toast from "react-hot-toast";
import uploadImage from "../common/uploadImage";

export default function EditPetForm({ pet, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: pet.name,
    species: pet.species,
    vaccinated: pet.vaccinated,
    baseFee: pet.baseFee,
    discountPercent: pet.discountPercent,
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
    setLoading(true);

    try {
      let updatedImages = pet.images || [];

      // Upload new image if selected
      if (formData.image) {
        const res = await uploadImage(formData.image);
        updatedImages = [res.secure_url];
      }

      const updateData = {
        name: formData.name,
        species: formData.species,
        vaccinated: formData.vaccinated,
        baseFee: Number(formData.baseFee),
        discountPercent: Number(formData.discountPercent),
        images: updatedImages,
      };

      await axiosInstance.put(
        Api.updatePet.url.replace(":id", pet._id),
        updateData
      );
      toast.success("Pet updated successfully!");
      setIsEditing(false);
      onUpdated(); // Refresh pet details
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update pet");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: pet.name,
      species: pet.species,
      vaccinated: pet.vaccinated,
      baseFee: pet.baseFee,
      discountPercent: pet.discountPercent,
      image: null,
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-4"
      >
        <Edit3 size={16} />
        Edit Pet Details
      </button>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Edit Pet Details</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pet Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Species
          </label>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="cow">Cow</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="vaccinated"
            id="vaccinated"
            checked={formData.vaccinated}
            onChange={handleChange}
            className="mr-2"
          />
          <label
            htmlFor="vaccinated"
            className="text-sm font-medium text-gray-700"
          >
            Vaccinated
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Base Fee (₹)
          </label>
          <input
            type="number"
            name="baseFee"
            value={formData.baseFee}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount Percent (%)
          </label>
          <input
            type="number"
            name="discountPercent"
            value={formData.discountPercent}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Update Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {pet.images?.[0] && (
            <p className="text-xs text-gray-500 mt-1">
              Current image will be replaced if you select a new one
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? "Updating..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
