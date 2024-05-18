import axios from "axios";
import React, { useEffect, useState } from "react";
import SectionContainer from "../reusable/SectionContainer";
import Loader from "../shared/Loader";

const OrderAddress = ({ order, loader }) => {
  const [divisions, setDivisions] = useState("");
  const [districts, setDistricts] = useState("");
  const [upazillas, setUpazillas] = useState("");
  useEffect(() => {
    async function getDivisions() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/address-info/division_list?division_id=${order?.Address?.DivisionID}`
      );
      setDivisions(data?.divisions[0]?.name);
    }
    getDivisions();
  }, [order?.Address?.DivisionID]);
  useEffect(() => {
    async function getUpazilla() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/address-info/upazila_list_with_district?district_id=${order?.Address?.DistrictID}&&upazila_id=${order?.Address?.UpazilaID}`
      );
      setUpazillas(data?.upazilas[0]?.name);
    }
    getUpazilla();
  }, [order?.Address?.DistrictID, order?.Address?.UpazilaID]);
  useEffect(() => {
    async function getDistrict() {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/public/product/shipping_data?division_id=${order?.Address?.DivisionID}&district_id=${order?.Address?.DistrictID}`
      );
      setDistricts(data?.data?.district?.name);
    }
    getDistrict();
  }, [order?.Address?.DistrictID, order?.Address?.DivisionID]);
  return (
    <SectionContainer className=" bg-white p-4 mb-3" title="Delivery address">
      {loader ? (
        <Loader></Loader>
      ) : (
        <div className="">
          <p className="text-gray-900 font-semibold">
            <span className="text-secondary font-semibold"> Home :</span>{" "}
            {order?.Address?.Address !== undefined &&
              `${order?.Address?.Address},`}{" "}
            {upazillas !== undefined && `${upazillas},`}{" "}
            {districts !== undefined && `${districts},`}{" "}
            {divisions !== undefined && `${divisions},`} Bangladesh
          </p>
          <div className="flex  lg:items-center lg:flex-row flex-col lg:space-x-8">
            <p className="text-gray-900 font-semibold">
              <span className="text-secondary font-semibold"> Phone : </span>
              {order?.Address?.PhoneNumber !== undefined
                ? ` +880${order?.Address?.PhoneNumber}`
                : "No phone number given."}
            </p>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

export default OrderAddress;
