import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  GET_DIVISION_LIST,
  GET_SELECTED_DISTRICT,
  GET_SELECTED_DIVISION_BY_ID,
} from "../../api";
import PaymentMethod from "../checkout/PaymentMethod";
import ShippingDetails from "../checkout/ShippingDetails";
import ConfirmCheckout from "../shared/ConfirmCheckout";
const GiftDetails = () => {
  const [address, setAddress] = useState();
  const [divisions, setDivisions] = useState([]);
  const [divisionSelected, setDivisionSelected] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtSelected, setDistrictSelected] = useState("");
  const [upazillas, setUpazillas] = useState([]);
  const [upazillaSelected, setUpazillaSelected] = useState("");
  const [selectedAddressID, setSelectedAddressID] = useState({});
  const [division, setDivisionId] = useState(divisions);
  const [district, setDistrictId] = useState(districts);
  const [upazilla, setUpazillaId] = useState(upazillas);
  const [ReceiveAt, setReceiveAt] = useState(1);
  const [FullName, setFullName] = useState("");
  const [Phone, setPhone] = useState("");
  const [AlternatePhone, setAlternatePhone] = useState("");
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
  useEffect(() => {
    async function getDivisions() {
      const { data } = await axios.get(GET_DIVISION_LIST);
      setDivisions(data.divisions);
    }
    getDivisions();
  }, []);
  useEffect(() => {
    if (divisionSelected) {
      async function getDistricts() {
        const { data } = await axios.get(
          GET_SELECTED_DIVISION_BY_ID.replace(
            "[divisionSelected]",
            divisionSelected
          )
        );
        setDistricts(data.districts);
      }
      getDistricts();
    }
  }, [divisionSelected]);
  //after selecting district get upazillas
  useEffect(() => {
    if (districtSelected) {
      async function getUpazilla() {
        const { data } = await axios.get(
          GET_SELECTED_DISTRICT.replace("[districtSelected]", districtSelected)
        );
        setUpazillas(data.upazilas);
      }
      getUpazilla();
    }
  }, [districtSelected]);
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 custom-container">
      <div className="lg:col-span-2 col-span-1 border-r py-10">
        <div className="w-11/12 mx-auto">
          <h1 className="text-2xl my-6 font-semibold">Gift Shipping Details</h1>
          <div>
            <ShippingDetails
              divisions={divisions}
              setDivisionSelected={setDivisionSelected}
              districts={districts}
              setDistrictSelected={setDistrictSelected}
              upazillas={upazillas}
              setUpazillaSelected={setUpazillaSelected}
              selectedAddressID={selectedAddressID}
              setSelectedAddressID={setSelectedAddressID}
              fromGift={true}
            ></ShippingDetails>
          </div>
          <hr className=" mt-6  mx-auto" />
          <div className="my-6">
            <p className="text-primary text-xl font-bold my-4">Gift To</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6">
              <div className="text-secondary col-span-2 flex items-center text-lg font-bold mt-4">
                <div className="mr-3">
                  <input
                    className="mx-1 cursor-pointer accent-primary"
                    type="radio"
                    name="address"
                    id="1"
                    checked={ReceiveAt == 1}
                    onChange={(e) => setReceiveAt(1)}
                  />{" "}
                  <label htmlFor="1" className="cursor-pointer">
                    Home
                  </label>
                </div>
                <div className="ml-3">
                  <input
                    className="mx-1 cursor-pointer accent-primary"
                    type="radio"
                    name="address"
                    id="2"
                    checked={ReceiveAt == 2}
                    onChange={(e) => setReceiveAt(2)}
                  />{" "}
                  <label htmlFor="2" className="cursor-pointer">
                    Office
                  </label>
                </div>
              </div>
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
                  onChange={(e) => setFullName(e.target.value)}
                  value={FullName}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Phone
                  </span>
                </label>
                <input
                  required
                  type="number"
                  placeholder="Phone Number"
                  name="PhoneNumber"
                  className="input rounded-none input-bordered w-full text-black"
                  onChange={(e) => setPhone(e.target.value)}
                  value={Phone}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className=" text-lg  text-secondary font-semibold">
                    Alternate Phone
                  </span>
                </label>
                <input
                  required
                  type="number"
                  placeholder="Alternate Phone Number"
                  name="AlternatePhoneNumber"
                  className="input rounded-none input-bordered w-full text-black"
                  value={AlternatePhone}
                  onChange={(e) => setAlternatePhone(e.target.value)}
                />
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
              <div className="form-control col-span-2 w-full">
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <button className="btn btn-primary w-full text-white cursor-pointer">
                  <label htmlFor="shipping-info-modal" className="w-full ">
                    Save Info
                  </label>
                </button>
              </div>
            </div>
            <PaymentMethod></PaymentMethod>
          </div>
        </div>
      </div>
      <div className="col-span-1 py-10">
        <ConfirmCheckout
          selectedAddressID={selectedAddressID}
          coupon="hidden"
          gift="hidden"
        ></ConfirmCheckout>
      </div>
    </div>
  );
};

export default GiftDetails;
