import { useAccount } from "wagmi";
import { WalletOptions } from "../wallet-options";

export default function UserAccount() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting)
    return (
      <div className="address">
        <div className="head-card-ac mx-5 mt-4 width-100">Connecting… </div>
      </div>
    );
  if (isDisconnected)
    return (
      <div className="address">
        <div className="head-card-ac mx-5 mt-4 width-100"> <WalletOptions /></div>
        
      </div>
    );
  return (
    <div className="address">
      <div className="head-card-ac mx-5 mt-4 width-100">
        <p className="cards-title clr-w">{address}</p>
      </div>
    </div>
  );
}
