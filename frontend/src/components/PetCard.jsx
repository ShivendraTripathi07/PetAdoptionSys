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
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out relative group border border-gray-100"
      onClick={handleCardClick}
    >
      {
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 hover:scale-110 transition-all duration-200 z-10 shadow-lg opacity-0 group-hover:opacity-100 focus:outline-none"
          title="Delete Pet"
        >
          <Trash2 size={18} />
        </button>
      }

      {pet.images?.[0] ? (
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-56 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-t-xl">
          <span className="text-gray-400 text-5xl">🐾</span>
        </div>
      )}

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pet.name}</h3>
        <p className="text-gray-500 text-sm mb-3 capitalize">{pet.species}</p>

        <div className="space-y-2 text-sm">
          <p className="text-gray-700">
            Base Fee: <span className="font-semibold">₹{pet.baseFee}</span>
          </p>

          {pet.discountPercent > 0 && (
            <p className="text-green-600">
              Discount:{" "}
              <span className="font-semibold">{pet.discountPercent}%</span>
            </p>
          )}

          <p className="text-blue-700 font-bold">
            Final Fee: ₹
            {pet.baseFee - (pet.baseFee * pet.discountPercent) / 100}
          </p>

          <div className="flex items-center justify-between mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                pet.vaccinated
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
            </span>

            {pet.owner && (
              <span
                className="text-xs text-gray-400 truncate max-w-28"
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
