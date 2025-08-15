import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../common/axiosInstance";
import Api from "../common/index";
import toast from "react-hot-toast";

export default function PetCard({ pet, onDeleted }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isOwner = user && pet.owner?._id === user._id;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete ${pet.name}?`)) return;

    try {
      await axiosInstance.delete(Api.deletePet.url.replace(":id", pet._id));
      toast.success("Pet deleted successfully!");
      onDeleted();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete pet");
    }
  };

  const handleCardClick = () => {
    navigate(`/pets/${pet._id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative group"
      onClick={handleCardClick}
    >
      {
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 hover:scale-110 transition-all z-10 shadow-md opacity-80 group-hover:opacity-100"
          title="Delete Pet"
        >
          <Trash2 size={16} />
        </button>
      }

      {pet.images?.[0] ? (
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">🐾</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{pet.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{pet.species}</p>

        <div className="space-y-1 text-sm">
          <p className="text-gray-600">
            Base Fee: <span className="font-medium">₹{pet.baseFee}</span>
          </p>

          {pet.discountPercent > 0 && (
            <p className="text-green-600">
              Discount:{" "}
              <span className="font-medium">{pet.discountPercent}%</span>
            </p>
          )}

          <p className="text-blue-600 font-semibold">
            Final Fee: ₹
            {pet.baseFee - (pet.baseFee * pet.discountPercent) / 100}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                pet.vaccinated
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
            </span>

            {pet.owner && (
              <span
                className="text-xs text-gray-500 truncate max-w-24"
                title={pet.owner.name}
              >
                by {pet.owner.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
