import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectPurchaseHistory } from "../Store/authSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { fetchPurchaseHistory, logout } from "../Store/authSlice";
import { LogOut } from "lucide-react";

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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden border-1 border-amber-500">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 flex flex-row justify-between  items-center sm:items-center border-b-1 border-amber-500">
          <div className="flex items-center">
            <div className="w-12 h-12 sm:w-15 sm:h-15 bg-white rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-[22px] sm:text-2xl">👤</span>
            </div>
            <div className="ml-4">
              <h2 className="text-[18px] sm:text-xl font-semibold green-text break-all">{user?.name}</h2>
              <p className="text-red-700 text-[16px] sm:text-[17px] font-medium break-all">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 sm:px-4 sm:py-2 bg-white hover:bg-pink-200 green-text font-semibold rounded-lg transition-all duration-300 flex items-center justify-center sm:justify-start border-1 border-purple-600 cursor-pointer"
          >
            <LogOut className="sm:mr-2" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

        {/* Purchase History Section */}
        <div className="p-4 lg:p-6">
          <p className="text-[20px] sm:text-[21px] lg:text-[22px] xl:text-[24px] font-semibold roboto-serif text-pink-800 mb-4">
            Order History
          </p>

          {purchaseHistory.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto rounded-lg border border-pink-200">
                <table className="w-full">
                  <thead className="bg-pink-100">
                    <tr className="green-text poppins text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px]">
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold">
                        Product
                      </th>
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold">
                        Details
                      </th>
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold">
                        Price
                      </th>
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold">
                        Qty
                      </th>
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold">
                        Total
                      </th>
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold">
                        Delivery
                      </th>
                      <th className="px-2 py-4 lg:p-4 text-center font-semibold hidden md:block">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-100">
                    {purchaseHistory.map((purchase, index) => (
                      <tr
                        key={index}
                        className="hover:bg-pink-50/50 transition-colors"
                      >
                        <td className="p-2 items-center justify-center flex">
                          <LazyLoadImage
                            src={purchase.image}
                            alt={purchase.name}
                            // effect="blur"
                            className="w-24 h-25 object-cover rounded-md shadow-sm"
                          />
                        </td>
                        <td className="p-2 lg:p-4">
                          <div className="space-y-1">
                            <p className="font-medium text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-center text-green ">
                              {purchase.name}
                            </p>
                            <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-medium text-pink-900 text-center">
                              {extractWeight(purchase.selectedSize)}
                            </p>
                            <p className="text-[13px] sm:text-[14px] lg:text-[15px] xl:text-[16px] font-medium text-pink-500 text-center">
                              {purchase.number}
                            </p>
                            {/* <p className="text-[15px] font-medium text-pink-500 max-w-[180px] break-words text-center">
                              {purchase.cakeMessage || (
                                <span className="text-pink-400 text-center">-</span>
                              )}
                            </p> */}
                          </div>
                        </td>
                        <td className="p-2 lg:p-4 font-medium text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-center">₹ {purchase.price}</td>
                        <td className="p-2 lg:p-4 font-medium text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-center">{purchase.quantity}</td>
                        <td className="p-2 lg:p-4 font-medium text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-pink-900 text-center">
                          ₹ {purchase.total}
                        </td>
                        <td className="p-2 lg:p-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[17px] text-center">
                              {purchase.selectedDate || "N/A"}
                            </span>
                            <span className="text-[15px] font-medium text-pink-500 text-center">
                              {purchase.selectedTimeSlot || ""}
                            </span>

                          </div>
                        </td>
                        <td className="p-2 lg:p-4 text-pink-600 max-w-[175px] lg:max-w-[200px] break-words align-middle hidden md:table-cell">

                          <p className="text-[15px] font-medium text-pink-500 text-center line-clamp-3 lg:line-clamp-2 overflow-hidden text-ellipsis">
                            {purchase.street || ""}
                          </p>


                          <p className="text-[15px] font-medium text-pink-500 text-center">
                            {purchase.pincode || ""}
                          </p>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4">
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
                            ₹ {purchase.price} × {purchase.quantity}
                          </span>
                          <span className="font-medium">₹ {purchase.total}</span>
                        </div>

                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-pink-100">
                      <div className="text-sm">
                        <div>
                          <div className="flex items-center">
                            <p className="text-pink-600 font-medium mr-2 ">Delivery:</p>
                            <p className="whitespace-nowrap font-medium ">
                              {purchase.selectedDate || "N/A"} <span className="ml-2">{purchase.selectedTimeSlot || ""}</span>
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-pink-600 font-medium mr-2 ">Pincode:</p>
                            <span className="whitespace-nowrap font-medium ">
                              {purchase.pincode || ""}
                            </span>
                          </div>
                          <div className="flex">
                            <p className="text-pink-600 font-medium mr-2 ">Location:</p>
                            <span className="break-all font-medium">
                              {purchase.street?.length > 35
                                ? `${purchase.street.slice(0, 35)}...`
                                : purchase.street}
                            </span>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Section */}
              <div className="mt-6 p-2 bg-pink-50 rounded-xl grid grid-cols-2 gap-2">
                <div className="text-center">
                  {/* <p className="font-medium text-[16px] text-pink-600 mb-1">Convenience Fee</p>
                  <p className="font-medium text-[15px] text-pink-900">₹99</p> */}
                  <p className="font-medium text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[18px] text-green mb-1">Total Items</p>
                  <p className="font-medium text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[18px] text-red-500">
                    {purchaseHistory.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[18px] text-green mb-1">Overall Total</p>
                  <p className="font-medium text-[15px] sm:text-[16px] lg:text-[17px] xl:text-[18px] text-red-500">
                    ₹ {calculateTotalAmount()}
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
    </div >
  );
};

export default UserProfile;
