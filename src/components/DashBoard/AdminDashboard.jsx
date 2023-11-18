// AdminDashboard.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAdminDetails, updatePrice } from "../utils/api";
import SaveButton from "../SaveButton/SaveButton";
import "./AdminDashboard.scss";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Notification from "../Notification/Notification";
import Graph from "../Graph/Graph";
const AdminDashboard = () => {
  const { id } = useParams();
  const [adminDetails, setAdminDetails] = useState({});
  const [customSongAmount, setCustomSongAmount] = useState(0);
  const [regularSongAmounts, setRegularSongAmounts] = useState([0, 0, 0, 0]);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [chargeCustomers, setChargeCustomers] = useState(false);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await getAdminDetails(id);
        setAdminDetails(response.data);
        setChargeCustomers(response.data.charge_customers);
        setCustomSongAmount(response.data.amount.category_6 || 0);
        setRegularSongAmounts([
          response.data.amount.category_7 || 0,
          response.data.amount.category_8 || 0,
          response.data.amount.category_9 || 0,
          response.data.amount.category_10 || 0,
        ]);
        setIsSaveButtonDisabled(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin details", error);
        setNotification({
          message: "Failed to fetch admin details.",
          type: "error",
        });
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await updatePrice(id, {
        category_6: customSongAmount,
        category_7: regularSongAmounts[0],
        category_8: regularSongAmounts[1],
        category_9: regularSongAmounts[2],
        category_10: regularSongAmounts[3],
      });

      if (response.status === 200) {
        setNotification({
          message: "Prices saved successfully.",
          type: "success",
        });

        setTimeout(() => {
          setNotification(null);
        }, 2000);

        const updatedDetails = await getAdminDetails(id);
        setAdminDetails(updatedDetails.data);
      } else {
        setNotification({ message: "Failed to save prices.", type: "error" });
      }
    } catch (error) {
      console.log("Error updating prices", error);
      setNotification({ message: "Failed to save prices.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomAmountChange = (value) => {
    const intValue = parseInt(value, 10);
    setCustomSongAmount(intValue);
    setIsSaveButtonDisabled(intValue < 99 || !chargeCustomers);
  };

  const handleRegularAmountChange = (index, value) => {
    const newRegularAmounts = [...regularSongAmounts];
    newRegularAmounts[index] = value;
    setRegularSongAmounts(newRegularAmounts);

    const minValues = [79, 59, 39, 19];

    setIsSaveButtonDisabled(
      newRegularAmounts.some((amount, i) => amount < minValues[i]) ||
        newRegularAmounts[1] < 1 ||
        !chargeCustomers
    );
  };

  const handleChargeCustomersChange = (value) => {
    setChargeCustomers(value);
    if (!value) {
      setIsSaveButtonDisabled(true);
    } else {
      setIsSaveButtonDisabled(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1 className="heading">
          {adminDetails.name}, {adminDetails.location} on Dhun Jam
        </h1>
      </div>

      <div className="info">
        <label>Do you want to Charge your Customers for requesting songs?</label>
        <div className="radio-group">
          <input
            className="radio-1"
            type="radio"
            name="options"
            value="yes"
            checked={chargeCustomers}
            inputMode="numeric"
            onChange={() => handleChargeCustomersChange(true)}
          />
          Yes
          <input
            className="radio-1"
            type="radio"
            value="no"
            checked={!chargeCustomers}
            inputMode="numeric"
            onChange={() => {
              handleChargeCustomersChange(false);
            }}
          />
          No
        </div>
      </div>

      <div className="info-2 info-container">
        <label>Custom Song Request Amount-</label>
        <input
          type="number"
          value={customSongAmount}
          onChange={(e) => handleCustomAmountChange(e.target.value)}
          disabled={!chargeCustomers}
          min="99"
          inputMode="numeric"
        />
      </div>

      <div className="info-3 info-container">
        <label>Regular Song Request Amounts, from high to low-</label>
        {regularSongAmounts.map((amount, index) => (
          <input
            className="regularAmount"
            key={index}
            type="number"
            value={amount}
            onChange={(e) => handleRegularAmountChange(index, e.target.value)}
            disabled={!chargeCustomers}
            inputMode="numeric"
          />
        ))}
      </div>

      <Graph
        customSongAmount={customSongAmount}
        regularSongAmounts={regularSongAmounts}
        chargeCustomers={chargeCustomers}
      />

      <SaveButton onSave={handleSave} isDisabled={isSaveButtonDisabled} disabled={!chargeCustomers} />

      {loading && <LoadingSpinner />}

      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default AdminDashboard;
