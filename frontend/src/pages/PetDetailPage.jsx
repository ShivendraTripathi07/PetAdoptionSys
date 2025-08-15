import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Api from "../common/index";
import axiosInstance from "../common/axiosInstance";
import Loader from "../components/Loader";
import EditPetForm from "../components/EditPetForm";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function PetDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handlePetUpdated = () => {
    fetchPet();
    setShowEditModal(false);
  };

  const nextImage = () => {
    if (pet?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % pet.images.length);
    }
  };

  const prevImage = () => {
    if (pet?.images?.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + pet.images.length) % pet.images.length
      );
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
    <div className="p-6 max-w-5xl mx-auto">
      {/* Images Section */}
      {pet.images?.length > 0 && (
        <div className="mb-8">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <img
              src={pet.images[currentImageIndex]}
              alt={`${pet.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover"
            />

            {/* Navigation buttons for multiple images */}
            {pet.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {pet.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail grid for multiple images */}
          {pet.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
              {pet.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity ${
                    index === currentImageIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`${pet.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pet Details Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Header with title and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {pet.name}
            </h1>
            <p className="text-xl text-gray-600">{pet.species}</p>
          </div>

          { (
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Edit size={16} />
                Update Pet
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                <Trash2 size={16} />
                Delete Pet
              </button>
            </div>
          )}
        </div>

        {/* Pet Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pricing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Pricing Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Fee:</span>
                <span className="font-medium text-lg">₹{pet.baseFee}</span>
              </div>

              {pet.discountPercent > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-green-600">
                    {pet.discountPercent}%
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-gray-900 font-semibold">Final Fee:</span>
                <span className="font-bold text-xl text-blue-600">
                  ₹{pet.baseFee - (pet.baseFee * pet.discountPercent) / 100}
                </span>
              </div>
            </div>
          </div>

          {/* Health & Owner Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
              Additional Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vaccination Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    pet.vaccinated
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {pet.vaccinated ? "Vaccinated" : "Not Vaccinated"}
                </span>
              </div>

              {pet.owner && (
                <div className="pt-2 border-t">
                  <div className="text-gray-600 mb-1">Owner Details:</div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-900">
                      {pet.owner.name}
                    </p>
                    <p className="text-gray-600 text-sm">{pet.owner.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Pet Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title={`Edit ${pet.name}`}
      >
        <EditPetForm pet={pet} onUpdated={handlePetUpdated} />
      </Modal>
    </div>
  );
}
