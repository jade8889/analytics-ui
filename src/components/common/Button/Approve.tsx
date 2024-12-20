import useApprove from "@/src/hooks/useApprove";
import { ChainId, chains } from "@/src/statics/helpers/chains";
import { MaxUint256 } from "ethers";
import { Address } from "viem";

const Approve = ({
  chainId,
  amount,
  tokenAddress,
  spenderAddress,
  enabled,
}: {
  chainId: ChainId;
  amount: bigint | undefined;
  tokenAddress: Address;
  spenderAddress: Address;
  enabled: boolean;
}) => {
  const approveTX = useApprove(
    chainId,
    MaxUint256,
    chains[chainId].contracts.jadeToken.address as Address,
    chains[chainId].contracts.wheel[0].address as Address,
    true
  );

  return (
    <div
      className="cursor-pointer h-12 bg-[#007A50] rounded-xl content-center text-center"
      onClick={() => {
        if (approveTX.transaction.write) {
          approveTX.transaction.write();
        }
      }}
    >
      Approve
    </div>
  );
};

export default Approve;
