import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  GET_DIVISION_LIST,
  GET_SELECTED_DISTRICT,
  GET_SELECTED_DIVISION_BY_ID,
} from "../../api";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import ShippingDetails from "../../components/checkout/ShippingDetails";
import SectionContainer from "../../components/reusable/SectionContainer";
import ConfirmCheckout from "../../components/shared/ConfirmCheckout";

// all divisions;
export const getStaticProps = async () => {
  const { data } = await axios.get(GET_DIVISION_LIST);
  return {
    props: {
      divisions: data.divisions,
    },
  };
};

const Index = ({ divisions }) => {
  const [divisionSelected, setDivisionSelected] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtSelected, setDistrictSelected] = useState("");
  const [upazillas, setUpazillas] = useState([]);
  const [upazillaSelected, setUpazillaSelected] = useState("");
  const [selectedAddressID, setSelectedAddressID] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [COD, setCOD] = useState(false);
  //after selecting division get districts

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
    <div>
      <Head>
        <title>Okkhor - Checkout</title>
      </Head>
      {/* <div className="flex flex-col md:flex-row justify-between custom-container"> */}
      <div className="grid lg:grid-cols-3 gap-3 grid-cols-1 custom-container ">
        <SectionContainer className="lg:col-span-2 col-span-1">
          <ShippingDetails
            divisions={divisions}
            setDivisionSelected={setDivisionSelected}
            districts={districts}
            setDistrictSelected={setDistrictSelected}
            upazillas={upazillas}
            setUpazillaSelected={setUpazillaSelected}
            selectedAddressID={selectedAddressID}
            setSelectedAddressID={setSelectedAddressID}
          ></ShippingDetails>
          <SectionContainer className="bg-white">
            <PaymentMethod
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              COD={COD}
              setCOD={setCOD}
            ></PaymentMethod>
          </SectionContainer>
        </SectionContainer>
        <SectionContainer className="col-span-1 mb-3">
          <ConfirmCheckout
            selectedAddressID={selectedAddressID}
            selectedPaymentMethod={selectedPaymentMethod}
            coupon="hidden"
            gift="hidden"
            COD={COD}
          ></ConfirmCheckout>
        </SectionContainer>
      </div>
    </div>
  );
};

export default Index;
