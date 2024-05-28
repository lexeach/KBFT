import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "ethers/utils";
import dayjs from "dayjs";
import { BigNumberish } from "ethers";
import { contract_address, contract_abi } from "../contracts/contract";
import { config } from "../utils/config";

const UserInfo = () => {
  const { address } = useAccount();

  const userData = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "users",
    args: [address],
    config,
  });


  const directIncome = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "directIncome",
    args: [address],
    config,
  });

  const joiningRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "joiningRound",
    args: [address],
    config,
  });

  const regTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "regTime",
    args: [address],
    config,
  });

  const takenRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "takenRound",
    args: [address],
    config,
  });

  const withdrawableROI = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "withdrawableROI",
    args: [address],
    config,
  });


  let userDetail: bigint[] = [];
  userDetail = userData?.data as bigint[];
  const userId = userDetail ? userDetail[1] : 0;
  console.log("Its calling as User Info: ", userDetail);
  const userDetail_arr = [
    {
      id: "1",
      name: "User ID",
      value: userId,
    },
    {
      id: "2",
      name: "Referrer ID",
      value: userDetail ? Number(userDetail[2]) : 0,
    },
    {
      id: "3",
      name: "ownNode",
      value: userDetail ? formatEther(userDetail[3]) : 0,
    },
    {
      id: "4",
      name: "At Price",
      value: userDetail ? formatEther(userDetail[4]) : 0,
    },
    {
      id: "5",
      name: "Referred Users",
      value: userDetail ? Number(userDetail[5]) : 0,
    },
    {
      id: "6",
      name: "Income",
      value: userDetail ? formatEther(userDetail[6]) : 0,
    },
    {
      id: "7",
      name: "Level Income Received",
      value: userDetail ? formatEther(userDetail[7]) : 0,
    },
    {
      id: "8",
      name: "Taken ROI",
      value: userDetail ? formatEther(userDetail[8]) : 0,
    },
    {
      id: "9",
      name: "Stake Times",
      value: userDetail ? formatEther(userDetail[9]) : 0,
    },
    {
      id: "10",
      name: "Income Missed",
      value: userDetail && userDetail[10] > 0 ? formatEther(userDetail[10]) : 0,
    },
    {
      id: "11",
      name: "Direct Income",
      value: directIncome.data ? formatEther(directIncome.data  as BigNumberish) : 0,
    },
    {
      id: "12",
      name: "Joining Round",
      value: joiningRound.data ? joiningRound.data : 0,
    },
    {
      id: "13",
      name: "Reg Time",
      value: regTime.data
        ? dayjs(Number(regTime.data) * 1000).format("DD-MMM-YYYY")
        : "00-Month-0000",
      // value: regTime.data ? regTime.data : 0,
    },
    {
      id: '14',
      name: "Taken Round",
      value: takenRound.data ? takenRound.data : 0,
    },
    {
      id: '15',
      name: "Withdrawable ROI",
      value: withdrawableROI.data ? formatEther(withdrawableROI.data  as BigNumberish) : 0,
    },
  ];

  const levelsIncomeRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "levelsIncome",
    args: [address],
    config,
  });

  let levelsIncomeDetails: bigint[] = [];
  levelsIncomeDetails = levelsIncomeRes?.data as bigint[];

  const levelsRes = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "levels",
    args: [address],
    config,
  });

  let levelsDetails: bigint[] = [];
  levelsDetails = levelsRes?.data as bigint[];

  const level1Value = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "directIncome",
    args: [address],
    config,
  });

  let level1Income: bigint[] = [];
  level1Income = level1Value?.data as bigint[];

  const levelDetailsData = [
    {
      id: 1,
      level: "Level Number",
      team: "Team",
      income: "Income",
    },
    {
      id: 16,
      level: "Level 1",
      team: userDetail ? Number(userDetail[5]) : 0,
      income: level1Income
        ? formatEther(level1Income[0].toString()) + " USDT"
        : 0 + " USDT",
    },
    {
      id: 2,
      level: "Level 2",
      team: levelsDetails ? levelsDetails[0].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[0].toString() + " USDT"
        : 0 + " USDT",
    },

    {
      id: 3,
      level: "Level 3",
      team: levelsDetails ? levelsDetails[1].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[1].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 4,
      level: "Level 4",
      team: levelsDetails ? levelsDetails[2].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[2].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 5,
      level: "Level 5",
      team: levelsDetails ? levelsDetails[3].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[3].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 6,
      level: "Level 6",
      team: levelsDetails ? levelsDetails[4].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[4].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 7,
      level: "Level 7",
      team: levelsDetails ? levelsDetails[5].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[5].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 8,
      level: "Level 8",
      team: levelsDetails ? levelsDetails[6].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[6].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 9,
      level: "Level 9",
      team: levelsDetails ? levelsDetails[7].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[7].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 10,
      level: "Level 10",
      team: levelsDetails ? levelsDetails[8].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[8].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 11,
      level: "Level 11",
      team: levelsDetails ? levelsDetails[9].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[9].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 12,
      level: "Level 12",
      team: levelsDetails ? levelsDetails[10].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[10].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 13,
      level: "Level 13",
      team: levelsDetails ? levelsDetails[11].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[11].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 14,
      level: "Level 14",
      team: levelsDetails ? levelsDetails[12].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[12].toString() + " USDT"
        : 0 + " USDT",
    },
    {
      id: 15,
      level: "Level 15",
      team: levelsDetails ? levelsDetails[13].toString() : 0,
      income: levelsIncomeDetails
        ? levelsIncomeDetails[13].toString() + " USDT"
        : 0 + " USDT",
    },
  ];

  return (
    <>
      <div className="row px-5">
        {/* User Info  */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              KBC User info
            </div>
          </div>
          <div className="user-box">
            {userDetail_arr.map((e) => (
              <div key={e.id} className="user-item">
                <div className="col-6 user-title">{e.name}:</div>
                <div className="col-6 user-value">{e.value.toString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* KBC User Level info */}
        <div className="col-lg-6">
          <div className="d-flex justify-content-center mt-4">
            <div className="network-heading text-center rounded-top-2">
              KBC User Level info
            </div>
          </div>
          <div className="user-box1">
            {levelDetailsData.map(({ id, level, team, income }) => (
              <div key={id} className="user-item">
                <div className="col-6 user-title">{level}:</div>
                <div className="col-3 user-value">{team}</div>
                <div className="col-3 user-value">{income}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
