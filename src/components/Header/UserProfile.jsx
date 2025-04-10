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
    <div className="fixed mt-[50px] sm:mt-14 inset-0 bg-green-50 flex justify-center items-start p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-300 to-purple-400 p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl text-white">👤</span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold green-text">{user?.name}</h2>
              <p className="text-red-700 text-[17px] font-medium">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-white/20 hover:bg-white/30 green-text font-semibold rounded-lg transition-all duration-300 flex items-center"
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
        <div className="p-6">
          <p className="text-[24px] font-semibold roboto-serif text-pink-800 mb-4">
            Order History
          </p>

          {purchaseHistory.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto rounded-lg border border-pink-200">
                <table className="w-full">
                  <thead className="bg-pink-100">
                    <tr className="green-text poppins text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[17px]">
                      <th className="p-4 text-left font-semibold">
                        Product
                      </th>
                      <th className="p-4 text-left font-semibold">
                        Details
                      </th>
                      <th className="p-4 text-left font-semibold">
                        Price
                      </th>
                      <th className="p-4 text-left font-semibold">
                        Qty
                      </th>
                      <th className="p-4 text-left font-semibold">
                        Total
                      </th>
                      <th className="p-4 text-left font-semibold">
                        Delivery
                      </th>
                      <th className="p-4 text-left font-semibold">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-100">
                    {purchaseHistory.map((purchase, index) => (
                      <tr
                        key={index}
                        className="hover:bg-pink-50/50 transition-colors"
                      >
                        <td className="p-2">
                          <LazyLoadImage
                            src={purchase.image}
                            alt={purchase.name}
                            // effect="blur"
                            className="w-24 h-25 object-cover rounded-md shadow-sm"
                          />
                        </td>
                        <td className="p-2 lg:p-4">
                          <div className="space-y-1">
                            <p className="font-medium text-[17px] text-pink-900">
                              {purchase.name}
                            </p>
                            <p className="text-[15px] font-medium text-pink-500">
                              {extractWeight(purchase.selectedSize)}
                            </p>
                          </div>
                        </td>
                        <td className="p-2 lg:p-4 font-medium text-[16px]">₹{purchase.price}</td>
                        <td className="p-2 lg:p-4 font-medium text-[16px]">{purchase.quantity}</td>
                        <td className="p-2 lg:p-4 font-medium text-[16px] text-pink-900">
                          ₹{purchase.total}
                        </td>
                        <td className="p-2 lg:p-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium text-[16px]">
                              {purchase.selectedDate || "N/A"}
                            </span>
                            <span className="text-[15px] font-medium text-pink-500">
                              {purchase.selectedTimeSlot || "Anytime"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-pink-600">
                          {purchase.cakeMessage || (
                            <span className="text-pink-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {purchaseHistory.map((purchase, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-lg border border-pink-100"
                  >
                    <div className="flex gap-4">
                      <LazyLoadImage
                        src={purchase.image}
                        alt={purchase.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-pink-900">
                          {purchase.name}
                        </h4>
                        <p className="text-sm text-pink-500 mb-2 font-medium ">
                          {extractWeight(purchase.selectedSize)}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="font-medium ">
                            ₹{purchase.price} × {purchase.quantity}
                          </span>
                          <span className="font-medium">₹{purchase.total}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-pink-100">
                      <div className="text-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="sm:flex sm:items-center">
                            <span className="text-pink-600 font-medium mr-2 ">Delivery:</span>
                            <span className="whitespace-nowrap font-medium ">
                              {purchase.selectedDate || "N/A"} <span className="ml-2">{purchase.selectedTimeSlot || "Anytime"}</span>
                            </span>
                          </div>
                          <div className="mt-2 sm:mt-0 sm:flex sm:items-center">
                            <span className="text-pink-600 font-medium mr-2">Message:</span>
                            <span className="text-pink-500 truncate font-medium ">
                              {purchase.cakeMessage || "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="mt-6 p-2 bg-pink-50 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="text-center">
                  <span className="font-medium text-[16px] text-pink-600 mb-1">Convenience Fee</span>
                  <p className="font-medium text-[15px] text-pink-900">₹99</p>

                  <p className="font-medium text-[16px] text-pink-600 mb-1">Total Items</p>
                  <p className="font-medium text-[15px] text-pink-900">
                    {purchaseHistory.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-[17px] text-pink-600 mb-1">Overall Total</p>
                  <p className="font-medium text-[16px] text-purple-600">
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
                  className="h-24 w-24 mx-auto text-pink-300 mb-4"
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
                <h3 className="text-xl font-medium text-pink-500 mb-2">
                  No purchases yet
                </h3>
                <p className="text-pink-400">
                  Your orders will appear here once you make a purchase
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
