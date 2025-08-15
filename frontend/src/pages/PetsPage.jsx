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

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPets = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(Api.allPets.url, {
        params: { page, limit: 8 },
      });
      setPets(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.page || 1);
    } catch (err) {
      toast.error("Failed to load pets");
    } finally {
      setLoading(false);
    }
  };

  const handlePetAdded = () => {
    fetchPets(currentPage);
    setShowAddPetModal(false);
  };

  useEffect(() => {
    fetchPets(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6">
      {/* Add Pet Button */}
      <div className="mb-6 flex justify-between items-center">
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
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pets.map((pet) => (
              <PetCard
                key={pet._id}
                pet={pet}
                onDeleted={() => fetchPets(currentPage)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
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
