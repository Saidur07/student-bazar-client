import React, { useEffect, useState } from "react";
import SectionContainer from "../reusable/SectionContainer";

const OrderStatus = ({ order, loader }) => {
  const length = order?.OrderTracking?.length;
  const [pendingDate, setPendingDate] = useState("");
  const [recievedDate, setRecievedDate] = useState("");
  const [processingDate, setProcessingDate] = useState("");
  const [shippedDate, setShippedDate] = useState("");
  const [deliveredDate, setDeliveredDate] = useState("");
  const [orderTracking, setOrderTracking] = useState([]);

  useEffect(() => {
    setOrderTracking(order?.OrderTracking);
  }, [length, order]);

  useEffect(() => {
    if (orderTracking) {
      //
      //
      //
      // Set Pending Date
      //
      //
      const pending = orderTracking.find(
        (status) => status.Status === "PENDING"
      );

      if (pending) {
        setPendingDate(pending?.Date);
      }
      //
      //
      //
      // Set Recieved Date
      //
      //
      const recieve = orderTracking.find(
        (status) => status.Status === "RECEIVED"
      );
      if (recieve) {
        setRecievedDate(recieve?.Date);
      }

      //
      //
      //
      // Set Processing Date
      //
      //
      const processing = orderTracking.find(
        (status) => status.Status === "PROCESSING"
      );
      if (processing) {
        setProcessingDate(processing?.Date);
      }

      //
      //
      //
      // Set Shipped Date
      //
      //
      const shipped = orderTracking.find(
        (status) => status.Status === "SHIPPED"
      );
      if (shipped) {
        setShippedDate(shipped?.Date);
      }

      // Set Delivered Date
      //
      //
      const delivered = orderTracking.find(
        (status) => status.Status === "DELIVERED"
      );
      if (delivered) {
        setDeliveredDate(delivered?.Date);
      }
    }
  }, [orderTracking]);

  return (
    <div>
      <SectionContainer
        className="bg-white p-4 my-3"
        title={`Order Status #${order?.OrderID}`}
      >
        <div className="lg:mx-4  py-4 flex lg:justify-center justify-start">
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li
              data-content=""
              className={
                pendingDate ||
                recievedDate ||
                processingDate ||
                shippedDate ||
                deliveredDate !== ""
                  ? "step step-primary"
                  : "step" ||
                    (deliveredDate !== "" ? "step step-success" : "step")
              }
            >
              <p className="grid lg:m-4 m-2 lg:mx-10 ">
                Pending{" "}
                <span className="lg:text-sm text-xs">
                  {pendingDate !== "" && pendingDate.slice(0, 10)}
                </span>
              </p>
            </li>
            <li
              data-content=""
              className={
                recievedDate ||
                processingDate ||
                shippedDate ||
                deliveredDate !== ""
                  ? "step step-primary"
                  : "step" ||
                    (deliveredDate !== "" ? "step step-success" : "step")
              }
            >
              <p className="grid lg:m-4 m-2 lg:mx-10">
                Received{" "}
                <span className="lg:text-sm text-xs">
                  {recievedDate !== "" ? recievedDate.slice(0, 10) : ""}
                </span>
              </p>
            </li>
            <li
              data-content=""
              className={
                processingDate || shippedDate || deliveredDate !== ""
                  ? "step step-primary"
                  : "step" ||
                    (deliveredDate !== "" ? "step step-success" : "step")
              }
            >
              <p className="grid lg:m-4 m-2 lg:mx-10">
                Processing{" "}
                <span className="lg:text-sm text-xs">
                  {processingDate !== "" ? processingDate.slice(0, 10) : ""}
                </span>
              </p>
            </li>
            <li
              data-content=""
              className={
                shippedDate || deliveredDate !== ""
                  ? "step step-primary"
                  : "step" ||
                    (deliveredDate !== "" ? "step step-success" : "step")
              }
            >
              <p className="grid lg:m-4 m-2 lg:mx-10">
                Shipped{" "}
                <span className="lg:text-sm text-xs">
                  {shippedDate !== "" ? shippedDate.slice(0, 10) : ""}
                </span>
              </p>
            </li>
            <li
              data-content=""
              className={deliveredDate !== "" ? "step step-success" : "step"}
            >
              <p className="lg:m-4 m-2 grid lg:mx-10">
                Delivered{" "}
                <span className="lg:text-sm text-xs">
                  {deliveredDate !== "" ? deliveredDate.slice(0, 10) : ""}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </div>
  );
};

export default OrderStatus;
