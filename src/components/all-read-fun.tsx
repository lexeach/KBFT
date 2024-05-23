import { useAccount, useReadContract } from "wagmi";
import { contract_address, contract_abi } from "../contract";
import { config } from "../config";
import { useEffect, useState } from "react";

const AllReadInfo = () => {
  const { address } = useAccount();
  const [ currRound, setCurrRound] = useState(0)

  const currentRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRound",
    config,
  });

  useEffect(()=>{
    setCurrRound(Number(currentRound.data))
  },[])
  

//   const userData = useReadContract({
//     abi: contract_abi,
//     address: contract_address,
//     functionName: "users",
//     args: [address],
//     config,
//   });

  

//   let userDetail: bigint[] = [];
//   userDetail = userData?.data as bigint[];

  const directIncome = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "directIncome",
    args: [address],
    config,
  });

  console.log('directIncome', directIncome.data, typeof directIncome.data);


  const joiningRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "joiningRound",
    args: [address],
    config,
  });

  console.log('joiningRound', joiningRound.data, typeof joiningRound.data);


  const nodePrice = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "nodePrice",
    // args: [address],
    config,
  });

  console.log('nodePrice', nodePrice.data, typeof nodePrice.data);


  const perNodeRewardOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "perNodeRewardOnRound",
    args: [address],
    config,
  });

  console.log('perNodeRewardOnRound', perNodeRewardOnRound.data, typeof perNodeRewardOnRound.data);
  

  const regTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "regTime",
    args: [address],
    config,
  });

  console.log('regTime', regTime.data,typeof regTime.data);


  const rewardOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "rewardOnRound",
    args: [address],
    config,
  });

  console.log('rewardOnRound', rewardOnRound.data, typeof rewardOnRound.data);
  


  const soldNode = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "soldNode",
    // args: [address],
    config,
  });

  console.log('soldNode', soldNode.data, typeof soldNode.data);



  const takenRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "takenRound",
    args: [address],
    config,
  });

  console.log('takenRound', takenRound.data, typeof takenRound.data);



  const userProfitOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "userProfitOnRound",
    args: [currRound, address],
    config,
  });

  console.log('userProfitOnRound', userProfitOnRound.data, typeof userProfitOnRound.data);



  const usersOnRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "usersOnRound",
    args: [address],
    config,
  });

  console.log('usersOnRound', usersOnRound.data, typeof usersOnRound.data);


  const withdrawableROI = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: [address],
    config,
  });

  console.log('withdrawableROI', withdrawableROI.data, typeof withdrawableROI.data);

  const contract_detail = [
    {
      id: 1,
      name: "Direct Income",
      value:  directIncome.data ? directIncome.data : 0,
    },
    {
      id: 2,
      name: "Joining Round",
      value: joiningRound.data ? joiningRound.data : 0,
    },
    {
      id: 3,
      name: "Node Price",
      value: nodePrice.data ? Number(nodePrice.data) : 0,
    },
    {
      id: 4,
      name: "PerNode Reward On Round",
      value: perNodeRewardOnRound.data ? perNodeRewardOnRound.data : 0,
    },
    {
      id: 5,
      name: "Reg Time",
      value: regTime.data ? regTime.data : 0,
    },
    {
      id: 6,
      name: "Reward On Round",
      value: rewardOnRound.data ? rewardOnRound.data : 0,
    },
    {
      id: 7,
      name: "Sold Node",
      value: soldNode.data ? Number(soldNode.data) : 0,
    },
    {
      id: 8,
      name: "Taken Round",
      value: takenRound.data ? takenRound.data : 0,
    },
    {
      id: 9,
      name: "User ProfitOnRound",
      value: userProfitOnRound.data ? userProfitOnRound.data : 0,
    },
    {
      id: 10,
      name: "Users On Round",
      value: usersOnRound.data ? usersOnRound.data : 0,
    },
    {
        id: 11,
        name: "Withdrawable ROI",
        value: withdrawableROI.data ? withdrawableROI.data : 0,
      },
  ];


  return (
    <>
      <div className="row px-5">
        {/* User Info  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              Contract info
            </div>
          </div>
          <div className="user-box">
            {contract_detail.map(({id, name, value}) => (
              <div key={id} className="user-item">
                <div className="col-7 user-title">{name}:</div>
                <div className="col-5 user-value">{value.toString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default AllReadInfo;
