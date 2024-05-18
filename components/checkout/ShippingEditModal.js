/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { POST_EDIT_ADDRESS } from "../../api";

const ShippingModal = ({
  address,
  divisions,
  setDivisionSelected,
  districts,
  setDistrictSelected,
  upazillas,
  setUpazillaSelected,
  setUpdate,
  setEditModal,
}) => {
  const { AddressID, FullName, PhoneNumber, AlternatePhoneNumber, Address } =
    address;
  const cookies = new Cookies();
  const token = cookies.get("accessToken");
  const [name, setName] = useState(FullName);
  const [fullAddress, setFullAddress] = useState(Address);
  const [division, setDivisionId] = useState(divisions);
  const [district, setDistrictId] = useState(districts);
  const [upazilla, setUpazillaId] = useState(upazillas);
  const [Phone, setPhone] = useState(PhoneNumber);
  const [AlternatePhone, setAlternatePhone] = useState(AlternatePhoneNumber);

  const setDivision = (div_id) => {
    setDivisionSelected(div_id);
    setDivisionId(div_id);
  };
  const setDistrict = (dis_id) => {
    setDistrictSelected(dis_id);
    setDistrictId(dis_id);
  };
  const setUpazilla = (upa_id) => {
    setUpazillaSelected(upa_id);
    setUpazillaId(upa_id);
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setName(value);
  };
  const handlePhoneChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setPhone(value);
  };
  const _newAddress = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      Phone === "" ||
      /^-?\d+$/.test(Phone) === false ||
      Phone.length < 10 ||
      division === "" ||
      district === "" ||
      upazilla === ""
    ) {
      toast.warn("Please fill all fields correctly");
      return;
    }

    const data = {
      AddressID: AddressID,
      FullName: name,
      PhoneNumber: Phone,
      AlternatePhoneNumber: AlternatePhone,
      ReceiveAt: 1,
      DivisionID: division,
      DistrictID: district,
      UpazilaID: upazilla,
      Address: fullAddress,
    };

    axios
      .patch(POST_EDIT_ADDRESS, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
      })
      .then((res) => {
        toast.success("Address edited Successfully");
        setUpdate(res.data);
        setEditModal(false);
      })
      .catch((err) => {
        toast.error("Something went wrong! please try again");
        setEditModal(false);
      })
      .finally(() => {
        setUpazillaId(null);
        setDistrictId(null);
        setDivisionId(null);
        setFullAddress(null);
      });
  };
  return (
    <>
      <div className="modal modal-bottom sm:modal-middle p-4">
        <div className="modal-box ">
          <label
            htmlFor="shipping-edit-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-black mb-6">Shipping info</h3>
          <hr />
          <div className="text-secondary flex items-center text-lg font-bold my-4"></div>

          <form className="">
            <div className="grid-col-1 lg:grid-col-2 gap-x-16 gap-y-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Name
                  </span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="Name"
                  name="FullName"
                  className="input rounded-none input-bordered w-full text-black"
                  onChange={handleNameChange}
                  value={name}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Phone
                  </span>
                </label>
                <div className="flex">
                  <p className="border flex-center px-2 bg-gray-200 text-gray-700">
                    +880
                  </p>
                  <input
                    required
                    type="text"
                    placeholder="Phone Number"
                    name="PhoneNumber"
                    className="input rounded-none input-bordered w-full text-black"
                    minLength="10"
                    maxLength="10"
                    onChange={handlePhoneChange}
                    value={Phone}
                  />
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Alternate Phone
                  </span>
                </label>
                <div className="flex">
                  <p className="border flex-center px-2 bg-gray-200 text-gray-700">
                    +880
                  </p>
                  <input
                    required
                    type="text"
                    placeholder="Alternate Phone Number"
                    name="AlternatePhoneNumber"
                    className="input rounded-none input-bordered w-full text-black"
                    minLength="10"
                    maxLength="10"
                    value={AlternatePhone}
                    onChange={(e) => setAlternatePhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Division
                  </span>
                </label>

                <select
                  name="DivisionID"
                  id="lang"
                  className="input rounded-none input-bordered   w-full   focus:outline-none pb-1 text-gray-900 text-sm "
                  required
                  onChange={(e) => setDivision(e.target.value)}
                >
                  <option
                    hidden
                    className="text-lg text-secondary font-semibold"
                  >
                    Choose Division
                  </option>
                  {divisions?.map((division) => (
                    <option key={division._id} value={division.division_id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    District
                  </span>
                </label>

                <select
                  name="DistrictID"
                  id="lang"
                  onChange={(e) => setDistrict(e.target.value)}
                  className="input rounded-none input-bordered   w-full   focus:outline-none pb-1 text-gray-900 text-sm "
                  required
                >
                  <option
                    value
                    hidden
                    disabled
                    className="text-lg  text-secondary font-semibold"
                  >
                    Choose District
                  </option>

                  {districts ? (
                    districts?.map((district) => (
                      <option key={district._id} value={district.district_id}>
                        {district.name}
                      </option>
                    ))
                  ) : (
                    <option value="None">No District Available</option>
                  )}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Upazilla
                  </span>
                </label>

                <select
                  name="UpazilaID"
                  id="lang"
                  onChange={(e) => setUpazilla(e.target.value)}
                  className="input rounded-none input-bordered   w-full   focus:outline-none pb-1 text-gray-900 text-sm "
                  required
                >
                  <option
                    value
                    hidden
                    className="text-lg  text-secondary font-semibold"
                  >
                    Choose Upazilla
                  </option>
                  {upazillas ? (
                    upazillas?.map((upazilla) => (
                      <option key={upazilla._id} value={upazilla.upazila_id}>
                        {upazilla.name}
                      </option>
                    ))
                  ) : (
                    <option value="None">No Upazilla Available</option>
                  )}
                </select>
              </div>
            </div>
            <div className="form-control w-full my-4">
              <label className="label">
                <span className=" text-lg  text-secondary font-semibold">
                  Your full address
                </span>
              </label>
              <input
                required
                type="text"
                placeholder="Full address"
                name="Address"
                className="input rounded-none input-bordered w-full text-black"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
              />
            </div>
            <div className="modal-action w-full">
              <button
                onClick={_newAddress}
                className="btn btn-primary w-full text-white cursor-pointer"
              >
                <label className="w-full ">Save Info</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingModal;
