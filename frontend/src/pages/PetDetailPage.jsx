import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../common/index";
import axiosInstance from "../common/axiosInstance";
import Loader from "../components/Loader";
import EditPetForm from "../components/EditPetForm";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPet = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(Api.petDetail.url.replace(":id", id));
      setPet(res.data);
    } catch {
      toast.error("Failed to load pet details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await axiosInstance.delete(Api.deletePet.url.replace(":id", id));
      toast.success("Pet deleted successfully!");
      navigate("/pets");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete pet");
    }
  };

  useEffect(() => {
    fetchPet();
  }, [id]);

  if (loading) return <Loader />;
  if (!pet)
    return <p className="text-center text-gray-500 mt-10">Pet not found</p>;

  const isOwner = user && pet.owner?._id === user._id;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {pet.images?.[0] && (
        <img
          src={pet.images[0]}
          alt={pet.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <h1 className="text-2xl font-bold">{pet.name}</h1>
      <p className="text-gray-500">{pet.species}</p>
      <p className="mt-2">Base Fee: ₹{pet.baseFee}</p>
      <p>Discount: {pet.discountPercent}%</p>
      <p>Final Fee: ₹{pet.adoptionFeeFinal}</p>
      <p>Status: {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}</p>
      {pet.owner && (
        <p className="mt-2 text-sm text-gray-600">
          Owner: {pet.owner.name} ({pet.owner.email})
        </p>
      )}

      {isOwner && (
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete Pet
          </button>
        </div>
      )}

      {isOwner && <EditPetForm pet={pet} onUpdated={fetchPet} />}
    </div>
  );
}
