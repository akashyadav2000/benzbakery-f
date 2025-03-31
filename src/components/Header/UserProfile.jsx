import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectPurchaseHistory } from "../Store/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { fetchPurchaseHistory, logout } from "../Store/authSlice";

const extractWeight = (selectedSize) => {
  const match = selectedSize.match(/\((\d+kg)\)/);
  return match ? match[1] : selectedSize;
};

const UserProfile = ({ showUserInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const purchaseHistory = useSelector(selectPurchaseHistory);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (user) {
      dispatch(fetchPurchaseHistory(user.email));
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Login");
  };

  const calculateTotalAmount = () => {
    let total = 0;
    purchaseHistory.forEach((purchase) => {
      total += purchase.total;
    });
    return total + 99;
  };

  if (!isAuthenticated || location.pathname !== "/UserProfile") return null;

  return (
    <div className="fixed mt-[50px] sm:mt-14 inset-0 bg-gray-100/95 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col h-[90vh]">
        {/* Header Section - Improved Design */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/20">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
              <span className="text-2xl text-white">👤</span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-white">{user?.name}</h2>
              <p className="text-white/90 text-sm">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 flex items-center border border-white/20 hover:border-white/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Sign Out
          </button>
        </div>

        {/* Purchase History Section */}
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 sticky top-0 bg-white pb-4 z-10 border-b border-gray-200">
            Order History
          </h3>

          <div className="flex-1 overflow-auto">
            {purchaseHistory.length > 0 ? (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr className="border-b border-gray-200">
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 border-r border-gray-200">
                          Product
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 border-r border-gray-200">
                          Details
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 border-r border-gray-200">
                          Price
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 border-r border-gray-200">
                          Qty
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 border-r border-gray-200">
                          Total
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600 border-r border-gray-200">
                          Delivery
                        </th>
                        <th className="p-4 text-left text-sm font-semibold text-gray-600">
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {purchaseHistory.map((purchase, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="p-4 border-r border-gray-100">
                            <LazyLoadImage
                              src={purchase.image}
                              alt={purchase.name}
                              className="w-22 h-25 object-cover rounded-xl shadow-sm"
                            />
                          </td>
                          <td className="p-4 border-r border-gray-100">
                            <div className="space-y-1">
                              <p className="font-medium text-gray-900">
                                {purchase.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {extractWeight(purchase.selectedSize)}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 border-r border-gray-100">₹{purchase.price}</td>
                          <td className="p-4 border-r border-gray-100">{purchase.quantity}</td>
                          <td className="p-4 font-medium text-gray-900 border-r border-gray-100">
                            ₹{purchase.total}
                          </td>
                          <td className="p-4 border-r border-gray-100">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {purchase.selectedDate || "N/A"}
                              </span>
                              <span className="text-sm text-gray-500">
                                {purchase.selectedTimeSlot || "Anytime"}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">
                            {purchase.cakeMessage || (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {purchaseHistory.map((purchase, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                    >
                      <div className="flex gap-4">
                        <LazyLoadImage
                          src={purchase.image}
                          alt={purchase.name}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-100"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {purchase.name}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">
                            {extractWeight(purchase.selectedSize)}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span>
                              ₹{purchase.price} × {purchase.quantity}
                            </span>
                            <span className="font-medium">₹{purchase.total}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-gray-600 font-medium">Delivery</p>
                            <p>{purchase.selectedDate || "N/A"}</p>
                            <p className="text-gray-500">
                              {purchase.selectedTimeSlot || "Anytime"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-medium">Message</p>
                            <p className="text-gray-500">
                              {purchase.cakeMessage || "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Section */}
                <div className="mt-6 p-6 bg-gray-50 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-6 border border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Convenience Fee</p>
                    <p className="font-medium text-gray-900">₹99</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Items</p>
                    <p className="font-medium text-gray-900">
                      {purchaseHistory.reduce(
                        (acc, item) => acc + item.quantity,
                        0
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Overall Total</p>
                    <p className="font-medium text-xl text-purple-600">
                      ₹{calculateTotalAmount()}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 mx-auto text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-500 mb-2">
                    No purchases yet
                  </h3>
                  <p className="text-gray-400">
                    Your orders will appear here once you make a purchase
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;