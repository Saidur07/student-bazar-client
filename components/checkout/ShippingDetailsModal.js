/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { GET_USER_INFO, POST_NEW_ADDRESS } from "../../api";

const ShippingModal = ({
  divisions,
  setDivisionSelected,
  districts,
  setDistrictSelected,
  upazillas,
  setUpazillaSelected,
  setUpdate,
  setShippingDetailsModal,
}) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState();
  const [division, setDivisionId] = useState(divisions);
  const [district, setDistrictId] = useState(districts);
  const [upazilla, setUpazillaId] = useState(upazillas);
  const [Phone, setPhone] = useState("");
  const [AlternatePhone, setAlternatePhone] = useState("");
  const [ReceiveAt, setReceiveAt] = useState(1);
  const router = useRouter();
  useEffect(() => {
    axios
      .get(GET_USER_INFO, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setUser(data.user_data);
          setName(data.user_data?.FullName);
          setPhone(data.user_data?.PhoneNumber?.slice(4));
        } else if (data.status === 403) {
          cookies.remove("accessToken");
          router.push("/signin");
        }
      });
    if (!token) {
      router.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
      FullName: name,
      PhoneNumber: Phone,
      AlternatePhoneNumber: AlternatePhone,
      ReceiveAt: ReceiveAt,
      DivisionID: division,
      DistrictID: district,
      UpazilaID: upazilla,
      Address: address,
    };

    axios
      .post(POST_NEW_ADDRESS, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
      })
      .then((res) => {
        toast.success("Address Added Successfully");
        setUpdate(res.data);
        setShippingDetailsModal(false);
      })
      .catch((err) => {
        toast.error("Something went wrong! please try again");
        setShippingDetailsModal(false);
      })
      .finally(() => {
        setUpazillaId(null);
        setDistrictId(null);
        setDivisionId(null);
        setAddress(null);
      });
  };
  return (
    <>
      <div className="modal modal-bottom sm:modal-middle p-4">
        <div className="modal-box ">
          <label
            htmlFor="shipping-info-modal"
            onClick={() => setShippingDetailsModal(false)}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-black mb-6">Shipping info</h3>
          <hr />

          <div className="text-secondary flex items-center text-lg font-bold my-4">
            {/*  <div className="mx-3">
              <input
                className="mx-1 cursor-pointer accent-primary"
                type="radio"
                name="address"
                id="1"
                checked={ReceiveAt === 1 ? true : false}
                onChange={() => setReceiveAt(1)}
              />{" "}
              <label
                htmlFor="1"
                className="cursor-pointer"
                onClick={() => setReceiveAt(1)}
              >
                Home
              </label>
            </div> */}
            {/* <div className="mx-3">
              <input
                className="mx-1 cursor-pointer accent-primary"
                type="radio"
                name="address"
                id="2"
                checked={ReceiveAt === 2 ? true : false}
                onClick={() => setReceiveAt(2)}
              />{" "}
              <label
                htmlFor="2"
                className="cursor-pointer"
                onClick={() => setReceiveAt(1)}
              >
                Pickup point
              </label>
            </div> */}
          </div>
          {ReceiveAt === 1 ? (
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
                      readOnly={user?.PhoneVerified ? true : false}
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
                    <option className="text-sm text-secondary font-semibold">
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
                    <option className="text-sm  text-secondary font-semibold">
                      Choose District
                    </option>

                    {districts?.length > 0 ? (
                      districts?.map((district) => (
                        <option key={district._id} value={district.district_id}>
                          {district.name}
                        </option>
                      ))
                    ) : (
                      <option value="None" disabled>
                        No District Available
                      </option>
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
                    <option className="text-sm  text-secondary font-semibold">
                      Choose Upazilla
                    </option>
                    {upazillas?.length > 0 ? (
                      upazillas?.map((upazilla) => (
                        <option key={upazilla._id} value={upazilla.upazila_id}>
                          {upazilla.name}
                        </option>
                      ))
                    ) : (
                      <option value="None" disabled>
                        No Upazilla Available
                      </option>
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
          ) : (
            <div className="mt-6 px-2 hidden">
              <p className="text-3xl font-semibold  text-black ">
                Select pickup point
              </p>
              <form>
                <label
                  htmlFor="p1 "
                  className="flex my-4 border-y items-center justify-between"
                >
                  <input
                    type="radio"
                    name=""
                    id="p1"
                    className="accent-primary w-6 h-6 cursor-pointer mr-4"
                  />
                  <div className=" my-2 space-y-2">
                    <p className="text-black text-xl font-semibold">
                      DEX Mirpur 2 Station
                    </p>
                    <p className="text-secondary ">
                      Club Road 225 Senpara 2nd floor DARAZ MIRPUR S... Dhaka,
                      Dhaka - North, Mirpur{" "}
                    </p>
                    <p className="text-primary ">9:00AM-6:00PM</p>
                  </div>
                </label>
                <label
                  htmlFor="p2 "
                  className="flex my-4 border-b items-center justify-between"
                >
                  <input
                    type="radio"
                    name=""
                    id="p2"
                    className="accent-primary w-6 h-6 cursor-pointer mr-4"
                  />
                  <div className=" my-2 space-y-2">
                    <p className="text-black text-xl font-semibold">
                      DEX Mirpur 2 Station
                    </p>
                    <p className="text-secondary ">
                      Club Road 225 Senpara 2nd floor DARAZ MIRPUR S... Dhaka,
                      Dhaka - North, Mirpur{" "}
                    </p>
                    <p className="text-primary ">9:00AM-6:00PM</p>
                  </div>
                </label>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShippingModal;
