import { useAccount, useReadContract } from "wagmi";
import { Form, Input } from "antd";
import { formatEther } from "ethers/utils";
import { BigNumberish } from "ethers";

import { contract_address, contract_abi } from "../contracts/contract";
import { config } from "../utils/config";
import { useEffect, useState } from "react";

const AllReadInfo = () => {
  const { address } = useAccount();
  const [currRound, setCurrRound] = useState(0);

  const currentRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRound",
    config,
  });

  useEffect(() => {
    setCurrRound(Number(currentRound.data));
  }, [currentRound.data]);

  const perNodeRewardOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "perNodeRewardOnRound",
    args: [currRound],
    config,
  });

  const rewardOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "rewardOnRound",
    args: [currRound],
    config,
  });


  const userProfitOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userProfitOnRound",
    args: [currRound, address],
    config,
  });


  const usersOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "usersOnRound",
    args: [currRound],
    config,
  });

  const contract_detail = [
    {
      id: 4,
      name: "PerNode Reward On Round",
      value: perNodeRewardOnRound.data ? formatEther(perNodeRewardOnRound?.data  as BigNumberish) : 0,
    },
    {
      id: 6,
      name: "Reward On Round",
      value: rewardOnRound.data ? formatEther(rewardOnRound?.data  as BigNumberish) : 0,
    },
    {
      id: 9,
      name: "User ProfitOnRound",
      value: userProfitOnRound.data ? formatEther(userProfitOnRound?.data  as BigNumberish) : 0,
    },
    {
      id: 10,
      name: "Users On Round",
      value: usersOnRound.data ? usersOnRound.data : 0,
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const useInput = Number(event.target.value);
    setCurrRound(useInput);
  };

  return (
    <>
      {/* User Info  */}
      <div className="col-lg-6">
        <div className="d-flex justify-content-center mt-4">
          <div className="network-heading text-center rounded-top-2">
            Contract info
          </div>
        </div>
        <div className="user-box">
          <div className="centered-input">
            <Form.Item label="Round" className="node-title" name="crRound">
              <Input
                type="number"
                className="input_filed w-250p"
                placeholder="0"
                value={currRound}
                onChange={handleChange}
              />
            </Form.Item>
          </div>

          {contract_detail.map(({ id, name, value }) => (
            <div key={id} className="user-item">
              <div className="col-7 user-title">{name}:</div>
              <div className="col-5 user-value">{value.toString()}</div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
export default AllReadInfo;
