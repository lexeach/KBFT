import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAccount, useReadContract } from "wagmi";
import { parseEther } from "ethers/utils";
import { simulateContract, writeContract } from "@wagmi/core";

import {
  contract_address,
  contract_abi,
  contract_current_admin,
  contract_address_stable_coin_usdt,
  contract_abi_stabel_coin_usdt,
  contract_address_bnb_kbc,
  contract_abi_bnb_kbc,
  contract_price_pool
} from "../contract";
import { config } from "../config";

import { check_usd_price } from "../utils/convert-to-eth";

const WriteAbleFun = () => {
  // const [withDrawlVal, setWithDrawalVal] = useState(0);
  // const [withDrawlROI, setWithDrawalROI] = useState(0);
  const [isOwner, setIsOwner] = useState(false);
  const [kbcVal, setKbcVal] = useState<number>(1);
  const [usdVal, setUsdVal] = useState<string>("");
  const [nodeQ_val, setNodeQ_val] = useState<number>(1);

  const ownerWallet = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "ownerWallet",
    // args: [address],
    config,
  });
  console.log("ownerWallet", ownerWallet.data);

  useEffect(() => {
    if (ownerWallet.data === contract_current_admin) {
      setIsOwner(true);
    }
  });

  const { address } = useAccount();
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


  const BalanceOfKBC = useReadContract({
    abi: contract_abi_bnb_kbc,
    address: contract_address_bnb_kbc,
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
    BalanceOfKBC.data as bigint,
    BalanceOfStableCoin.data as bigint
  );
  useEffect(() => {
    setUsdVal(USD_price.toString());
  }, [BalanceOfKBC.data, BalanceOfStableCoin.data]);


  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputVal = parseInt(event.target.value, 10);
  //   setKbcVal(isNaN(inputVal) ? 0 : inputVal);
  // };

  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   const charCode = event.which ? event.which : event.keyCode;
  //   if (charCode < 48 || charCode > 57) {
  //     event.preventDefault();
  //   }
  // };

  // register function start
  type RegistrationValues = {
    nodeQuantity: string;
    referralId: string;
  };

  const onFinishReg = async (values: RegistrationValues) => {
    console.log("values", values);

    const { request } = await simulateContract(config, {
      abi: contract_abi,
      address: contract_address,
      functionName: "Registration",
      args: [values.referralId, values.nodeQuantity],
      value: parseEther(values.nodeQuantity),
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
        {/* Register function  */}
        <div className="col-lg-6">
          <div className="swap-wrap p-5 position-relative">
            <div className="reg-calac  top-15 text-center mb-2">
              <div className="">
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
              <div className="ml-4x mt-2">
                <span className="clr-base">1 USDT</span>{" "}
                <span className="clr-base ml-2">=</span>
                <span className="kbc-val">
                  {kbcVal === 1 ? usdVal : Number(usdVal)} KBC
                </span>
              </div>
            </div>
            <div className="swap-head text-center">Register</div>
            <div className="swap">
              <div className="swap-box">
                <Form
                  {...formItemLayout}
                  name="register"
                  onFinish={onFinishReg}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Node Quantity"
                    name="nodeQuantity"
                    rules={[
                      {
                        required: true,
                        message: "Please input your nodeQuantity!",
                      },
                    ]}
                    className="node-title"
                  >
                    <Input
                      className="input_filed"
                      placeholder="0"
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

        {/* set Liquidity PoolAddress */}
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

        {/* set RoundCloser Address  */}
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

        {/* set global Insurance Address (0x2fc3dff0)  */}
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

        {/* withDrawal ROI  */}
        {isOwner && (
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
          </div>
        )}
        {/* Close Round  */}
        {isOwner && (
          <div className="col-lg-6">
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
          </div>
        )}
      </div>
    </>
  );
};

export default WriteAbleFun;
