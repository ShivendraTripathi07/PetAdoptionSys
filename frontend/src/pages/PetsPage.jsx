import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Api from "../common/index";
import axiosInstance from "../common/axiosInstance";
import PetCard from "../components/PetCard";
import PetForm from "../components/PetForm";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPetModal, setShowAddPetModal] = useState(false);

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

  const handlePetAdded = () => {
    fetchPets();
    setShowAddPetModal(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="p-6">
      {/* Add Pet Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddPetModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          <Plus size={20} />
          Add Pet
        </button>
      </div>

      {/* Pet Grid */}
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

      {/* Add Pet Modal */}
      <Modal
        isOpen={showAddPetModal}
        onClose={() => setShowAddPetModal(false)}
        title="Add New Pet"
      >
        <PetForm onPetAdded={handlePetAdded} />
      </Modal>
    </div>
  );
}
