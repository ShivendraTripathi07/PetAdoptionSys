import { useEffect, useState } from "react";
import axiosInstance from "../common/axiosInstance";
import Api from "../common";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({ user: null, pets: [] });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axiosInstance.get(Api.getMyPets.url);
        console.log("API Response:", res.data);

        // Extract nested API data
        const apiData = res.data?.data || {};
        setProfileData({
          user: apiData.user || user,
          pets: apiData.pets || [],
        });
        setErrorMsg(null);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setErrorMsg("Failed to load profile data. Showing saved info.");
        // Fallback to context user if API fails
        setProfileData({ user, pets: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const { user: profileUser, pets: myPets } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Error Message UI */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-6">
            {errorMsg}
          </div>
        )}

        {/* Hero Profile Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={
                  profileUser?.profilePic || "https://via.placeholder.com/150"
                }
                alt={profileUser?.name || "User"}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {profileUser?.name || "Pet Lover"}
              </h1>
              <p className="text-blue-100 text-lg mb-4">{profileUser?.email}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="block font-semibold">Member Since</span>
                  <span className="text-blue-100">
                    {profileUser?.createdAt
                      ? new Date(profileUser.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <span className="block font-semibold">Pets Posted</span>
                  <span className="text-blue-100">{myPets.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Pets Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <span className="text-4xl">🐾</span>
              My Pets
            </h2>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              + Add New Pet
            </button>
          </div>

          {myPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myPets.map((pet) => (
                <div
                  key={pet._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
                >
                  {/* Pet Image */}
                  <div className="relative h-48 overflow-hidden">
                    {pet.images?.length > 0 ? (
                      <img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-6xl opacity-50">🐕</span>
                      </div>
                    )}

                    {/* Vaccination Badge */}
                    {pet.vaccinated && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                        ✓ Vaccinated
                      </div>
                    )}

                    {/* Discount Badge */}
                    {pet.discountPercent > 0 && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                        {pet.discountPercent}% OFF
                      </div>
                    )}
                  </div>

                  {/* Pet Details */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        {pet.name}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {pet.species}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mb-3">
                      {pet.discountPercent > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            ₹{pet.adoptionFeeFinal}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{pet.baseFee}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">
                          ₹{pet.adoptionFeeFinal}
                        </span>
                      )}
                    </div>

                    {/* Posted Date */}
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Posted {new Date(pet.createdAt).toLocaleDateString()}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                        Edit
                      </button>
                      <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🐕</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No pets posted yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start your journey by posting your first pet for adoption. Help
                them find their forever home!
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Post Your First Pet
              </button>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Pets</p>
                <p className="text-3xl font-bold">{myPets.length}</p>
              </div>
              <div className="text-4xl opacity-80">🐾</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Vaccinated Pets</p>
                <p className="text-3xl font-bold">
                  {myPets.filter((pet) => pet.vaccinated).length}
                </p>
              </div>
              <div className="text-4xl opacity-80">💉</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">With Discount</p>
                <p className="text-3xl font-bold">
                  {myPets.filter((pet) => pet.discountPercent > 0).length}
                </p>
              </div>
              <div className="text-4xl opacity-80">🏷️</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
