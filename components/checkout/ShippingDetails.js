import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import { GET_ALL_ADDRESS } from "../../api";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "../shared/Loader";
import ShippingDetailsModal from "./ShippingDetailsModal";
import ShippingEditModal from "./ShippingEditModal";

const ShippingDetails = ({
  divisions,
  setDivisionSelected,
  districts,
  setDistrictSelected,
  upazillas,
  setUpazillaSelected,
  selectedAddressID,
  setSelectedAddressID,
  fromGift,
}) => {
  const [address, setAdress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const cookie = new Cookies();
  const [update, setUpdate] = useState({});
  const [shippingDetailsModal, setShippingDetailsModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);

  useEffect(() => {
    setToken(cookie.get("accessToken"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      if (token) {
        const { data } = await axios.get(GET_ALL_ADDRESS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
        });
        setAdress(data.addresses);
      } else {
        setAdress([]);
        setLoading(false);
      }
      setLoading(false);
    }

    fetchData();
  }, [token, update]);

  const deleteAddress = async (id) => {
    Swal.fire({
      title: "Are you sure to delete this address?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A8A8A",
      cancelButtonColor: "#F26133",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteData = async () => {
          const address_data = {
            AddressID: id,
          };
          const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/private/address/delete?AddressID=${address_data.AddressID}`,

            {
              body: address_data,
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          toast.success(data.message);
          setUpdate(data);
          setSelectedAddressID("");
        };
        deleteData();
      } else {
        return;
      }
    });
  };
  return (
    <div>
      <SectionContainer
        title={fromGift ? "Gift Details" : "Shipping Details"}
        line={true}
        className="bg-white p-3 font-bangla"
      >
        {loading ? (
          <Loader></Loader>
        ) : (
          address.map((address, index) => (
            <div key={address?.AddressID ? address.AddressID : index}>
              <label
                htmlFor={`addType${index}`}
                className="flex gap-5  group relative hover:border-primary transition-all"
              >
                <div className="flex gap-1 items-center justify-center">
                  <input
                    type="radio"
                    name=""
                    id={`addType${index}`}
                    className="w-4 h-4 accent-primary"
                    checked={selectedAddressID === address.AddressID}
                    onChange={() => setSelectedAddressID(address.AddressID)}
                  />

                  <p className="text-secondary cursor-pointer">
                    {" "}
                    {address?.ReceiveAt == 1 ? "Home" : "Office"}
                  </p>
                </div>
                <div className="">
                  <p className="">Name: {address?.FullName}</p>
                  <p>Phone: {address?.PhoneNumber}</p>
                  {address?.AlternatePhoneNumber && (
                    <p>Alternate Phone: {address?.AlternatePhoneNumber}</p>
                  )}
                  <p className="text-slate-500">{address?.Address}</p>
                </div>
                <div className="flex md:flex-row flex-col md:items-center justify-center gap-3">
                  <div
                    className="flex items-center my-2 cursor-pointer lg:hover:text-secodary text-primary lg:hover:underline"
                    onClick={() => deleteAddress(address?.AddressID)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <p className="font-medium ">Delete</p>
                  </div>
                  <div>
                    <label
                      onClick={() => setEditModal(true)}
                      htmlFor="shipping-edit-modal"
                      className="flex items-center  cursor-pointer lg:hover:text-secodary text-primary lg:hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <p className=" font-medium ">Edit</p>
                    </label>
                  </div>
                  <input
                    type="checkbox"
                    id="shipping-edit-modal"
                    className="modal-toggle accent-primary"
                  />
                  {EditModal === true && (
                    <ShippingEditModal
                      setEditModal={setEditModal}
                      setUpdate={setUpdate}
                      selectedAddressID={selectedAddressID}
                      divisions={divisions}
                      setDivisionSelected={setDivisionSelected}
                      districts={districts}
                      setDistrictSelected={setDistrictSelected}
                      upazillas={upazillas}
                      setUpazillaSelected={setUpazillaSelected}
                      address={address}
                    ></ShippingEditModal>
                  )}
                </div>
              </label>
            </div>
          ))
        )}
        <div className=" border-primary p-3 justify-center items-center mt-4 cursor-pointer">
          <label
            onClick={() => setShippingDetailsModal(true)}
            className="btn btn-block cursor-pointer modal-button lg:hover:bg-primary text-primary lg:hover:text-white transition-all"
            htmlFor="shipping-info-modal"
          >
            Add address
          </label>
          <input
            type="checkbox"
            id="shipping-info-modal"
            checked={shippingDetailsModal === true ? true : false}
            onChange={() => {}}
            className="modal-toggle accent-primary"
          />

          <ShippingDetailsModal
            setShippingDetailsModal={setShippingDetailsModal}
            setUpdate={setUpdate}
            selectedAddressID={selectedAddressID}
            divisions={divisions}
            setDivisionSelected={setDivisionSelected}
            districts={districts}
            setDistrictSelected={setDistrictSelected}
            upazillas={upazillas}
            setUpazillaSelected={setUpazillaSelected}
          ></ShippingDetailsModal>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ShippingDetails;
