import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import Nav from "../component/Nav";
import { TiLockClosed } from 'react-icons/ti';
import { TiLockOpen } from 'react-icons/ti';
import { Button } from "react-bootstrap";
import { contractAddress, contrctAbi, contractApprove, contractApproveAbi, contractUnstakeApprove, contractUnstakeApproveAbi } from "../Utils/Contract";
import { loadWeb3 } from '../component/API/api'
import Connect from "../component/Connect/Connect";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from "web3";
const Home = () => {
  const inputVal = useRef(0);
  const unStakeVal = useRef({});
  const [stakedTokens, setStakedTokens] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [totalStakeMilEth, setTotalStakeMilEth] = useState(0);
  const [stakingReward, setStakingReward] = useState(0);
  const [supply, setTotalSupply] = useState(0);
  const approvetokens = async () => {
    try {
      let add = await loadWeb3();
      if (add == "No Wallet") {
        toast.error("No Wallet")
      } else if (add == "Wrong Network") {
        toast.error("Connect to Rinkeby")
        console.log('Wrong Network');
      }
      else {
        const web3 = window.web3;
        console.log("Cost", contractAddress);
        let StakeValue = inputVal.current.value;
        let contractOf = new web3.eth.Contract(contractApproveAbi, contractApprove);
        await contractOf.methods.approve(contractAddress, web3.utils.toWei(StakeValue)).send({
          from: add
        })
        stake(StakeValue);
      } toast.success("Transaction Approved Successful")
    } catch (e) {
      // toast.error("Failed Approving Amount")
      console.log("Error while approving", e);
    }
  }
  const stake = async (StakeValue) => {
    try {
      console.log("Clicked Stake");
      let add = await loadWeb3();
      if (add == "No Wallet") {
        toast.error("No Wallet")
      } else if (add == "Wrong Network") {
        toast.error("Connect to Rinkeby")
        console.log('Wrong Network');
      }
      else {
        const web3 = window.web3;
        let contractAdd = new web3.eth.Contract(contrctAbi, contractAddress);
        console.log('contractAdd', contractAdd);
        await contractAdd.methods.stake(web3.utils.toWei(StakeValue)).send({
          from: add,

        });
        toast.success("✔️ your Staking is success");
      }

    } catch (e) {
      toast.error("❌ your Staking is rejected");
      console.log("error while Staking", e);
    }
  };
  const getDate = async () => {

    console.log("function in");
    let acc = await loadWeb3();

    let web3 = window.web3;
    let contractOf = new web3.eth.Contract(contrctAbi, contractAddress);
    try {
      let UserMap = await contractOf.methods.users(acc).call();
      let userStaked = web3.utils.fromWei(UserMap.stakedTokens);
      console.log('contractOf', UserMap.stakedTokens);
      setStakedTokens(userStaked);

    } catch (error) {
      console.log("error block", error);
    }
  };
  const approvetokensUnstak = async () => {
    console.log('stakedTokens', stakedTokens);

    try {
      let add = await loadWeb3();
      if (add == "No Wallet") {
        toast.error("No Wallet")
      } else if (add == "Wrong Network") {
        toast.error("Connect to Rinkeby")
        console.log('Wrong Network');
      }
      else {
        const web3 = window.web3;
        console.log("Cost", contractAddress);
        let stakingCOntractOf = new web3.eth.Contract(contractUnstakeApproveAbi, contractUnstakeApprove);

        await stakingCOntractOf.methods.approve(contractAddress, web3.utils.toWei(stakedTokens)).send({
          from: add
        })
        unStake();
      } toast.success("Unstake Approved Successful")
    } catch (e) {
      // toast.error("Failed Approving Amount")
      console.log("Error while approving", e);
    }
  }

  const getMilBalance = async () => {
    try {
      //console.log("unstaking....");
      let acc = await loadWeb3();
      if (acc == "No Wallet") {
        toast.error("No Wallet")
      } else if (acc == "Wrong Network") {
        toast.error("Connect to Rinkeby")
        console.log('Wrong Network');
      }
      else {
        const web3 = window.web3;
        let milEthContract = new web3.eth.Contract(contractApproveAbi, contractApprove);
        let balance = await milEthContract.methods.totalStaked(acc).call();
        setTokenBalance(balance);
      }

    } catch (e) {
      toast.error("❌ your unStaking is rejected");
      console.log("error while Staking", e);
    }
  }
  const unStake = async () => {
    try {
      console.log("unstaking....");
      let unstake = await loadWeb3();
      if (unstake == "No Wallet") {
        toast.error("No Wallet")
      } else if (unstake == "Wrong Network") {
        toast.error("Connect to Rinkeby")
        console.log('Wrong Network');
      }
      else {
        const web3 = window.web3;
        let unStakingCOntractOf = new web3.eth.Contract(contrctAbi, contractAddress);

        await unStakingCOntractOf.methods.unstake().send({
          from: unstake,
        });

        toast.success("✔️ your unStaking is success");
      }

    } catch (e) {
      toast.error("❌ your unStaking is rejected");
      console.log("error while Staking", e);
    }
  };
  const getTotalStakeMilEth = async () => {
    console.log("totalStakeMilEth");
    try {
      let acc = await loadWeb3();
      let web3 = window.web3;
      let contractOf = new web3.eth.Contract(contrctAbi, contractAddress);
      let totalStakeMilEth = await contractOf.methods.totalStaked().call();
      let stakeMilEth = web3.utils.fromWei(totalStakeMilEth);
      console.log('totalStakeMilEth', stakeMilEth);
      setTotalStakeMilEth(stakeMilEth);
      // setStakedTokens(userStaked);

    } catch (error) {
      console.log("error block", error);
    }
  };
  const getStakingReward = async () => {
    try {
      let acc = await loadWeb3();
      let web3 = window.web3;
      let contractOf = new web3.eth.Contract(contractApproveAbi, contractApprove);
      let stakingReward = await contractOf.methods.balanceOf(acc).call();
      let stakingRewardRound = web3.utils.fromWei(stakingReward);
      console.log('getStakingReward', stakingRewardRound);
      setStakingReward(stakingRewardRound);
      // setStakedTokens(userStaked);

    } catch (error) {
      console.log("error block", error);
    }
  };
  const getTotalSupply = async () => {
    try {
      let acc = await loadWeb3();
      let web3 = window.web3;
      let contractOfStake = new web3.eth.Contract(contrctAbi, contractAddress);
      let totalStakeMilEth = await contractOfStake.methods.totalStaked().call();
      let stakeMilEth = web3.utils.fromWei(totalStakeMilEth);
      let contractOf = new web3.eth.Contract(contractApproveAbi, contractApprove);
      let totalSupply = await contractOf.methods.totalSupply().call();
      let totalSupplyRound = web3.utils.fromWei(totalSupply);
      const supply = (stakeMilEth / totalSupplyRound) * 100;
      // let value = new Number(supply);
      // value = parseFloat(value) * parseFloat(supply);
      // console.log("ethToUsd", value);
      setTotalSupply(supply);
    } catch (error) {
      console.log("error block", error);
    }
  };
  setTimeout(() => {
    getStakingReward();
  }, 5000);
  useEffect(() => {
    getDate();
    getTotalStakeMilEth();
    getStakingReward();
    getTotalSupply();
  }, [])
  return (
    <div className="home py-5">
      <Nav />
      {/* main section */}
      <section className="main">
        <div className="container">
          <div className="row">
            {/* total */}
            <div className="col-md-6 my-3">
              <Card>
                <div>
                  <div className="text-center extrabold text-uppercase border-bottom text-white font-weight-bold fs-2 pt-2 pb-2">
                    Total Staked $MilEth
                  </div>
                  <div className="text-center text-white py-5 ">
                    <span className="txt-3xl regular">{totalStakeMilEth}</span>
                    <span className="txt-2xl ms-2">$MilEth</span>
                    <div className="light txt-xl">{supply}%</div>
                    <p className="light txt-xl">of total supply</p>
                  </div>
                </div>
              </Card>
            </div>
            {/* fees */}
            <div className="col-md-6 my-3">
              <Card>
                <div className="fees">
                  <div className="text-center extrabold text-uppercase border-bottom text-white font-weight-bold fs-2 pt-2 pb-2">
                    Fees
                  </div>

                  <div className="list text-center ">
                    <ul >
                      <li className="extralight">
                        Registration Fee:
                        <span className="text-white "> 1 $MilEth</span>
                      </li>
                      <li className="extralight">
                        Staking Fee:
                        <span className="text-white"> 0.5</span>
                      </li>
                      <li className="extralight">
                        Unstaking Fee:
                        <span className="text-white"> 1.5%</span>
                      </li>
                      <li className="extralight">
                        Minimum Stake:
                        <span className="text-white"> 45000 $MilEth</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
            {/* staking */}
            <div className="col-md-6 my-3">
              <Card>
                <div className="staking">
                  <div className="text-center extrabold text-uppercase border-bottom text-white font-weight-bold fs-2 pt-2 pb-2">
                    staking
                  </div>
                  <div className="py-5">
                    <div className="list text-center ">
                      <ul>
                        <li className="extralight">
                          Minimum amount needed:
                          <span className="text-white fs-2"> 45001</span>
                          <span className="text-white fs-3 ms-2">$MilEth</span>
                        </li>
                        <li className="extralight">
                          Available amount:
                          <span className="text-white fs-2"> {() => getMilBalance()}</span>
                          <span className="text-white fs-3 ms-2">$MilEth</span>
                        </li>
                      </ul>
                    </div>
                    <div class="custom-search ">
                      <input
                        type="number"
                        class="custom-search-input text-white"
                        placeholder="$MilEth To stake"
                        ref={inputVal}
                      />
                      <button class="custom-search-botton" type="submit">
                        <TiLockClosed className="mb-2 me-2" />
                        <span className="fw-bold" onClick={() => approvetokens()}>STAKE</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* earnings */}
            <div className="col-md-6 my-3">
              <Card>
                <div className="earning">
                  <div className="text-center extrabold text-uppercase border-bottom text-white font-weight-bold fs-2 pt-2 pb-2">
                    your earnings
                  </div>
                  <div className="py-4">
                    <div className="text-center pb-2">
                      <span className="text-white fs-2">{stakingReward}</span>
                      <span className="text-white fs-3 ms-2"> $MilEth</span>
                    </div>
                    <div className="text-center">
                      <button class="claim-button" type="submit">
                        <TiLockOpen className="mb-2 me-2" />
                        <span className="fw-bold">CLAIM</span>
                      </button>
                    </div>

                    <div className="list text-center ">
                      <ul>
                        <li className="extralight">
                          Staking Reward:
                          <span className="text-white"> 0 $MilEth</span>
                        </li>
                        <li className="extralight">
                          Daily Return:
                          <span className="text-white"> 0.07 %</span>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* unstaking */}
            <div className="col-12 mx-auto">
              <Card>
                <div className="unstaking">
                  <div className="text-center extrabold text-uppercase border-bottom text-white font-weight-bold fs-2 pt-2 pb-2">
                    unstaking
                  </div>
                  <div className="py-5">
                    <div className="list text-center ">
                      <ul>
                        <li className="extralight">
                          Available to unstake:
                          <span className="text-white fs-2"> {stakedTokens}</span>
                          <span className="text-white fs-3 ms-2">$MilEth</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <button className="unstakeButton" type="submit" onClick={() => approvetokensUnstak()}>
                        <TiLockOpen className="mb-2 me-2" />
                        UNSTAKE
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <ToastContainer />

      </section>
    </div>
  );
};

export default Home;
