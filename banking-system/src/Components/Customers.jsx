import React, { useEffect, useState } from "react";
import Popup from "./popup";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/customers.css";

const Customers = () => {
  useEffect(() => {
    getCustomerData();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [ownerData, setOwnerData] = useState("");
  const [id, setId] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [balance, setBalance] = useState([]);
  const [amount, setAmount] = useState(0);
  const [transectionid, setTransectionId] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();
    setTransectionId(e.target.value);
  };

  const togglePopup = (e) => {
    setIsOpen(!isOpen);
  };

  const handleAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const proceedTransection = async (e) => {
    e.preventDefault();
    const id = transectionid;
    const money_val = amount;

    const res = await fetch("/Customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        money_val,
      }),
    });
    console.log(res.status);
    const data = await res.json();
    if (res.status === 200) {
      toast.success("Registered Successfully...", {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const getCustomerData = async (e) => {
    const res = await fetch("/Customers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await res.json();
    //console.log(data);
    let unique = data.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log(unique);
    unique.forEach((element) => {
      setId((id) => [...id, element.id]);
      setName((name) => [...name, element.name]);
      setEmail((email) => [...email, element.email]);
      setBalance((balance) => [...balance, element.balance]);
    });
    setOwnerData(data[0].balance);
  };
  return (
    <div className="customers">
      <div className="customers_header">
        <div className="logo">Sparks Bank</div>
      </div>
      <div className="home_link">
        <div className="home">
          <Link to="/" className="home_redirect">
            <FaArrowLeft /> Home
          </Link>
        </div>
        <div>
          <button className="view_transection">
            <Link to="/" className="transection">
              View Transections
            </Link>
          </button>
        </div>
      </div>
      <div className="account_holder_info">
        <div className="account_holder_name">ARTH SAVSANI</div>
        <div className="account_holder_balance">
          Account Balance : {ownerData}
        </div>
      </div>
      <div className="customer_list">
        <div className="customer_list_items">
          <div className="customers_details">
            <div className="customer_detail">
              {email.map((entry, index) => (
                <div className="customer_info">
                  <div className="customer_name">{name[index]}</div>
                  <div className="customer_email">{email[index]}</div>
                  <div className="customer_balance">{balance[index]}</div>
                  <div className="send_button">
                    <button className="button_val" onClick={togglePopup}>
                      send
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {isOpen && (
              <Popup
                content={
                  <>
                    <div className="title">
                      <b>Transfer Money</b>
                    </div>
                    <div className="receiver">
                      <input
                        type="text"
                        name="receiver_id"
                        id="receiver_id"
                        placeholder="Email Address"
                        value={transectionid}
                        onChange={handleEmail}
                      />
                    </div>
                    <div className="amount">
                      <input
                        type="text"
                        name="receiver_amount"
                        id="reveiver_amount"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={handleAmount}
                      />
                    </div>
                    <div className="send_money">
                      <button
                        className="transfer_button"
                        onClick={proceedTransection}
                      >
                        PROCEED
                      </button>
                    </div>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
