import { PawPrint, Syringe, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../common/axiosInstance";
import { useAuth } from "../context/AuthContext";
import Api from "../common";
import toast from "react-hot-toast";

export default function PetCard({ pet, onDeleted }) {
  const { user } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axiosInstance.delete(Api.deletePet.url.replace(":id", pet._id));
      toast.success("Pet deleted successfully!");
      onDeleted();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete pet");
    }
  };

  const isOwner = user && pet.owner?._id === user._id;
  const finalFee = pet.baseFee - (pet.discountPercent * pet.baseFee) / 100;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border hover:shadow-lg transition">
      {pet.images && pet.images.length > 0 ? (
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-40 h-40 object-cover rounded-md"
        />
      ) : (
        <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-gray-400">
          <PawPrint size={40} />
        </div>
      )}
      <h2 className="mt-3 font-semibold text-lg">{pet.name}</h2>
      <p className="text-gray-500">{pet.species}</p>
      <p className="text-green-600 font-medium">₹{pet.adoptionFeeFinal}</p>
      <div className="flex items-center mt-2 gap-1">
        <Syringe size={16} />
        <span className={pet.vaccinated ? "text-green-500" : "text-red-500"}>
          {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/pets/${pet._id}`}
          className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          <Eye size={14} /> View
        </Link>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            <Trash2 size={14} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}
