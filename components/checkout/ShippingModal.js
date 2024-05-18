import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShippingModal = ({
  divisions,
  setDeliveryDetails,
  setDivisionSelected,
  districts,
  setDistrictSelected,
  upazillas,
  setShippingModal,
  setUpazillaSelected,
}) => {
  const [division, setDivisionId] = useState(divisions);
  const [district, setDistrictId] = useState(districts);
  const [upazilla, setUpazillaId] = useState(upazillas);
  const [divisionID, setDivisionID] = useState(3);
  const [districtID, setDistrictID] = useState(1);
  const [upazillaID, setUpazillaID] = useState(565);

  /**
   *
   *
   *
   * Input Change Event
   *
   *
   */

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

  /**
   *
   *
   * Set Delivery Details to local storage
   *
   *
   */

  const handleSubmitToLocal = async (e) => {
    e.preventDefault();
    localStorage.setItem("UpazilaID", upazilla);
    localStorage.setItem("DistrictID", district);
    localStorage.setItem("DivisionID", division);
    const UpazilaID = localStorage.getItem("UpazilaID");
    const DistrictID = localStorage.getItem("DistrictID");
    const DivisionID = localStorage.getItem("DivisionID");
    setDivisionID(DivisionID);
    setDistrictID(DistrictID);
    setUpazillaID(UpazilaID);
  };

  /**
   *
   *
   *
   * Delivery Details From API
   *
   *
   */

  useEffect(() => {
    async function fetchData() {
      if (divisionID !== 3 && districtID !== 1 && upazillaID !== 565) {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/shipping_data?division_id=${divisionID}&district_id=${districtID}&upazila_id=${upazillaID}`
        );
        setDeliveryDetails(data.data);
        toast.success("Shipping Address Updated Successfully");
        setShippingModal(false);
      }
    }
    fetchData();
  }, [
    setDeliveryDetails,
    setShippingModal,
    divisionID,
    districtID,
    upazillaID,
  ]);

  return (
    <>
      <div className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box ">
          <label
            htmlFor="shipping-info-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-black">Shipping info</h3>
          <form>
            <div className="py-5">
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

            <div className="py-3">
              <label
                htmlFor="shipping-info-modal"
                onClick={(e) => handleSubmitToLocal(e)}
                className="btn btn-primary w-full text-white cursor-pointer"
              >
                Save Info
              </label>
              <input
                type="checkbox"
                id="shipping-info-modal"
                className="modal-toggle accent-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingModal;
