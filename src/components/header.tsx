import { useReadContract } from "wagmi";
import dayjs from "dayjs";

import { contract_abi, contract_address } from "../contract";
import { convert_eth_from_biginit } from "../utils/convert-to-eth";


const Header = () => {
  const availableNode = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "availableNode",
  });

  const currRound = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRound",
  });

  const currRoundStartTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currRoundStartTime",
  });

  const currUserID = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "currUserID",
  });

  const dailyReward = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "dailyReward",
  });
 
  const endTime = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "endTime",
  });

  const soldNode = useReadContract({
    abi: contract_abi,
    address: contract_address,
    functionName: "soldNode",
  });


  // const nodePrice = useReadContract({
  //   abi: contract_abi,
  //   address: contract_address,
  //   functionName: "nodePrice",
  // });


  interface BalanceDetail {
    value: number | undefined | string | bigint;
    name: string;
  }

  const Balance_detail: BalanceDetail[] = [
    {
      value:
        availableNode && typeof availableNode.data === "bigint"
          ? Number(availableNode?.data.toString())
          : 0,
      name: "Available Node",
    },
    {
      value:
        currRound && typeof currRound.data === "bigint"
          ? Number(currRound?.data.toString())
          : 0,
      name: "Current Round",
    },
    {
      value:
        dayjs(Number(currRoundStartTime.data) * 1000).format("DD-MMM-YYYY") ||
        "00-Month-0000",
      name: "Round Start Time",
    },
    {
      value:
        currUserID && typeof currUserID.data === "bigint"
          ? Number(currUserID.data.toString())
          : 0,
      name: "Current User ID",
    },
   
  ];


  interface Header_Two {
    value: number | undefined | string;
    name: string;
  }

  const Header_Two: Header_Two[] = [
    {
      value:
        dailyReward && typeof dailyReward.data === "bigint"
          ? convert_eth_from_biginit(dailyReward.data)
          : 0,
      name: "Daily Reward",
    }, {
      value:
        dayjs(Number(endTime.data) * 1000).format("DD-MMM-YYYY") ||
        "00-Month-0000",
      name: "End Time",
    },
    {
      value:
        soldNode && typeof soldNode.data === "bigint"
          ? Number(soldNode.data.toString())
          : 0,
      name: "Sold Node",
    }
    // ,
    // {
    //   value:
    //     nodePrice && typeof nodePrice.data === "bigint"
    //       ? Number(nodePrice.data.toString())
    //       : 0,
    //   name: "Node Price",
    // }
  ];

  return (
    <>
      <div className="head-card skew mx-5 mt-4">
        <div className="row">
          {Balance_detail.map((element: BalanceDetail, i) => (
            <div className="col-lg-3 col-sm-6" key={i}>
              <div className="box">
                <p className="cards-numbers">
                  {element?.value?.toString()}
                  {/* <span className="sub-number"> USDT</span> */}
                </p>
                <p className="cards-title">{element?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="head-card skew mx-5 mt-4">
        <div className="row">
          {Header_Two.map((element: BalanceDetail, i) => (
            <div className="col-lg-4 col-sm-6" key={i}>
              <div className="box">
                <p className="cards-numbers">{element?.value?.toString()}</p>
                <p className="cards-title">{element?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Header;
