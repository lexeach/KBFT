import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAccount, useReadContract } from "wagmi";
import { parseEther } from "ethers/utils";
import { simulateContract, writeContract } from "@wagmi/core";

import {
  contract_address,
  contract_abi,
  contract_address_stable_coin_usdt,
  contract_abi_stabel_coin_usdt,
  contract_price_pool,
} from "../contracts/contract";
import { config } from "../utils/config";

import { check_usd_price } from "../utils/convert-to-eth";
import AllReadInfo from "./all-read-fun";

const WriteAbleFun = () => {
  const { address } = useAccount();
  // const [withDrawlVal, setWithDrawalVal] = useState(0);
  // const [withDrawlROI, setWithDrawalROI] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [kbcVal, setKbcVal] = useState<number>(1);
  const [usdVal, setUsdVal] = useState<string>("");
  const [nodeQ_val, setNodeQ_val] = useState<number>(1);
  const [nodePrice, setNodePrice] = useState<number>(100);


  const nodePrice_ = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "nodePrice",
    // args: [address],
    config,
  });
  
  const ownerWallet = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "ownerWallet",
    // args: [address],
    config,
  });
  // console.log("ownerWallet >> ", ownerWallet.data);

  useEffect(() => {
    if(nodePrice_.data === undefined){
      setNodePrice(100)
      if (address && ownerWallet.data === address) {
        setIsOwner(true);
      }
    } else {
      const currentNodePrice = Number(nodePrice_.data)
      setNodePrice(currentNodePrice)
      if (address && ownerWallet.data === address) {
        setIsOwner(true);
      }
    }
  },[]);


  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = parseInt(event.target.value, 10);
    setKbcVal(isNaN(inputVal) ? 0 : inputVal);
    const nodeVal = inputVal * Number(usdVal);
    setNodeQ_val(nodeVal);
  };

  const BalanceOfKBC_WBNB = useReadContract({
    abi: contract_abi_stabel_coin_usdt,
    address: '0xE1e61dD8DF8bbF75935fe04Dc214c6d517fc3622',
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });

  const BalanceOfStableCoin = useReadContract({
    abi: contract_abi_stabel_coin_usdt,
    address: contract_address_stable_coin_usdt,
    functionName: "balanceOf",
    args: [contract_price_pool],
    config,
  });


  const USD_price = check_usd_price(
    BalanceOfKBC_WBNB.data as bigint,
    BalanceOfStableCoin.data as bigint
  );
  useEffect(() => {
    setUsdVal(USD_price.toString());
   }, [BalanceOfKBC_WBNB.data, BalanceOfStableCoin.data]);

  // register function start
  type RegistrationValues = {
    nodeQuantity: string;
    referralId: string;
  };

  const onFinishReg = async (values: RegistrationValues) => {

    const payableVal = Number(usdVal) * kbcVal;
    const node_quantity = kbcVal / 100;

    const { request } = await simulateContract(config, {
      abi: contract_abi,
      address: contract_address,
      functionName: "Registration",
      args: [Number(values.referralId), node_quantity],
      value: parseEther(payableVal.toString()),
    });
    const hash = await writeContract(config, request);

    console.log("hash", hash);
  };

  // end register function

  type DepositKBCValues = {
    payableAmount: string;
  };
  // deposit KBC
  const onFinishDepositKBC = async (values: DepositKBCValues) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "depositKBC",
          value: parseEther(values.payableAmount),
        });
        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // Set Address Start
  type setBoardPoolType = {
    address: string;
  };
  //Set Board Pool address
  const onFinishsetBoardPoolAddress = async (values: setBoardPoolType) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "setBoardPoolAddress",
          args: [values.address],
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //Set Board Pool address
  const onFinishsetLiquidityPoolAddress = async (values: setBoardPoolType) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "setLiquidityPoolAddress",
          args: [values.address],
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //Set Board Pool address
  const onFinishsetRoundCloserAddress = async (values: setBoardPoolType) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "setRoundCloserAddress",
          args: [values.address],
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  //Set Board Pool address
  const onFinishsetGlobalInsuranceAddress = async (
    values: setBoardPoolType
  ) => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "setglobalInsuranceAddress",
          args: [values.address],
        });
        const hash = await writeContract(config, request);

        console.log("hash", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  // Set Address End

  const withDrawRoiFun = async () => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "withdrawROI",
          // args: [values.Address]
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  const closeRoundFun = async () => {
    if (address) {
      try {
        const { request } = await simulateContract(config, {
          abi: contract_abi,
          address: contract_address,
          functionName: "closeRound",
          // args: [values.Address]
        });

        const hash = await writeContract(config, request);

        console.log("Transaction successful!", hash);
      } catch (error) {
        console.error("Error sending transaction to contract:", error);
      }
    } else {
      console.error(
        "MetaMask not detected. Please install MetaMask extension."
      );
    }
  };

  return (
    <>
      <div className="row px-5">
        <AllReadInfo />
        {/* Register function  */}
        <div className="col-lg-6">
          <div className="swap-wrap p-5 position-relative">
            <div className="reg-calac  top-15 text-center mb-2">
              <div className="clac-fild-parnt">
                <input
                  className="clac-field"
                  value={kbcVal}
                  type="number"
                  pattern="[0-9]*"
                  name="clac-field"
                />
                <span className="kbc-val">
                  {kbcVal === 1 ? usdVal : Number(usdVal) * kbcVal}
                </span>
              </div>
              <div className="ml-4x mt-2 usd-sec-reg">
                <span className="clr-base usd-sec-st">1 USDT</span>
                <span className="clr-base ml-2 usd-sec-se">=</span>
                <span className="kbc-val usd-sec-rd">
                  {kbcVal === 1 ? usdVal : Number(usdVal)} KBC
                </span>
              </div>
              <p>
                <span className="clr-base">Node Quantity:</span>
                <span className="kbc-val"> {kbcVal ? kbcVal / nodePrice : 0}</span>
              </p>
            </div>
            <div className="swap-head text-center reg-tag">Register</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinishReg}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label={`Node Quantity (Multiples of ${nodePrice})`}
                    name="nodeQuantity"
                    rules={[
                      {
                        required: true,
                        message:
                          `Please input a valid node quantity (multiple of ${nodePrice})!`,
                      },
                      {
                        validator: (rule, value) => {
                          console.log('--', rule);
                          
                          if (value && value % nodePrice !== 0) {
                            return Promise.reject(
                              `Please enter a multiple of ${nodePrice}`
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    className="node-title"
                  >
                    <Input
                      type="number"
                      className="input_filed"
                      placeholder="0"
                      step="100"
                      value={nodeQ_val}
                      onChange={handleChange}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Referral ID"
                    name="referralId"
                    rules={[
                      {
                        required: true,
                        message: "Please input your referralId!",
                      },
                    ]}
                  >
                    <Input className="input_filed" placeholder="Enter ID" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Box end here --> */}

        {/* Deposit KBFC  */}
        {isOwner && (
          <div className="col-lg-6">
            <div className="swap-wrap p-5">
              <div className="swap-head text-center">Deposit KBFC</div>
              <div className="swap">
                <div className="swap-box">
                  <Form
                    {...formItemLayout}
                    name="depositDbc"
                    onFinish={onFinishDepositKBC}
                    // onFinishFailed={onFinishFailedDepositKBC}
                    // payable amount should be zero
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Payable Amount"
                      name="payableAmount"
                      rules={[
                        {
                          required: true,
                          message: "Please input your payable amount!",
                        },
                      ]}
                    >
                      <Input
                        className="input_filed"
                        placeholder="Payable Amount"
                      />
                    </Form.Item>
                    <Form.Item className="text-center">
                      <Button className="submit-btn" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
       )}

        {/* Set Board Pool Address  */}

        {isOwner && (
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">
              Set Board <span className="text-warning">Pool Addrss</span>
            </div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="setBoardPoolAddress"
                  onFinish={onFinishsetBoardPoolAddress}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input className="input_filed" placeholder="Address" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
          )}

        {/* set Liquidity PoolAddress */}
        {isOwner && (
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">
              Set Liquidity <span className="text-warning">Pool Addrss</span>
            </div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="liquidity"
                  onFinish={onFinishsetLiquidityPoolAddress}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input className="input_filed" placeholder="Address" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
         )}

        {/* set RoundCloser Address  */}
        {isOwner && (
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">
              Set RoundCloser <span className="text-warning"> Addrss</span>
            </div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="roundcloser"
                  onFinish={onFinishsetRoundCloserAddress}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input className="input_filed" placeholder="Address" />
                  </Form.Item>
                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
        )} 

        {/* set global Insurance Address (0x2fc3dff0)  */}
        {isOwner && (
        <div className="col-lg-6">
          <div className="swap-wrap p-5">
            <div className="swap-head text-center">
              Set Global Insurance <span className="text-warning"> Addrss</span>
            </div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="globalInsuranceAddress"
                  onFinish={onFinishsetGlobalInsuranceAddress}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input className="input_filed" placeholder="Address" />
                  </Form.Item>

                  <Form.Item className="text-center">
                    <Button className="submit-btn" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
           )} 

        {/* withDrawal ROI  */}
        {/* {isOwner && ( */}
          <div className="col-lg-6">
            <div className="swap-wrap p-5">
              <div className="swap-head text-center">Withdraw ROI</div>
              <div className="swap h-100">
                <div className="swap-box">
                  <div className="pay text-center mt-5">
                    <Button
                      onClick={withDrawRoiFun}
                      className="submit-btn"
                      htmlType="submit"
                    >
                      WithDraw
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {isOwner && (
            <div className="swap-wrap p-5">
              <div className="swap-head text-center">Close Round</div>
              <div className="swap h-100">
                <div className="swap-box">
                  <div className="pay text-center mt-5">
                    <Button
                      onClick={closeRoundFun}
                      className="submit-btn"
                      htmlType="submit"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
               )}
          </div>
      </div>
    </>
  );
};

export default WriteAbleFun;
