import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../component/Nav";
import { loadWeb3 } from '../component/API/api'
import Connect from "../component/Connect/Connect";
const Index = () => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate()
  let [btnText, setBtnText] = useState("CONNECT WALLET")

  const getAccount = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      setBtnText("No Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtnText("Please connect Rinkeby Network")
    } else if (acc) {
      const myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtnText(myAcc);
      navigate('/home')

    } else {
      setModalShow(true)
    }
  }
  return (
    <div className="menu py-5">
      <Nav />

      <div className="container py-5">
        <div className="text-center">
          <div className=" pb-5">
            <button className="btn-cnct" onClick={() => getAccount()}>{btnText}</button>
          </div>
          <Connect modalShow={modalShow} setModalShow={setModalShow} />

          <div className=" pb-5">
            <h3 className="stake-txt text-white">Stake Your $GYEN Token</h3>
          </div>
          <div className="rules">
            <Card>
              <div className="text-center extrabold text-uppercase border-bottom text-white fs-1 font-weight-bold pt-2 pb-2">
                rules
              </div>
              <div className="list py-5 text-white">
                <ul>
                  <li className="extralight">1. Connect your wallet to participate</li>
                  <li className="extralight">
                    2. Stake $GYEN tokens and earn daily returns from allocated
                    pool
                  </li>
                  <li className="extralight">3. Withdraw earned rewards anytime</li>
                  <li className="extralight">4. Unstake $GYEN tokens anytime</li>
                  <li className="extralight">5. Earn extra rewards by referring new members</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
