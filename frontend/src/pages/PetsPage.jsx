import { useState, useEffect } from "react";
import Api from "../common/index";
import axiosInstance from "../common/axiosInstance";
import PetCard from "../components/PetCard";
import PetForm from "../components/PetForm";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(Api.allPets.url);
      setPets(res.data.items || []);
    } catch (err) {
      toast.error("Failed to load pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="p-6">
      <PetForm onPetAdded={fetchPets} />
      {loading ? (
        <Loader />
      ) : pets.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} onDeleted={fetchPets} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No pets available</p>
      )}
    </div>
  );
}
