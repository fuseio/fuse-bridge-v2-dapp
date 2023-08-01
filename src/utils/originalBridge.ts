import { Signer, ethers } from "ethers";
import {
  OriginalTokenBridgeAbi,
} from "../constants/types/OriginalTokenBridge";
import { web3OnboardProvider } from "./provider";
import { AdapterParams } from "@layerzerolabs/ui-core";
import { serializeAdapterParams } from "@layerzerolabs/ui-evm";

const getOriginalTokenBridge = (
  contractAddress: string,
  signerOrProvider: Signer | ethers.providers.Provider | undefined
) => {
  const contract = new ethers.Contract(
    contractAddress,
    OriginalTokenBridgeAbi,
    signerOrProvider
  );
  return contract;
};

export const bridgeOriginal = async (
  bridgeAddress: string,
  address: string,
  tokenAddres: string,
  amount: string,
  decimals: number
) => {
  const contract = getOriginalTokenBridge(bridgeAddress, web3OnboardProvider);
  const dstGasLimit = await contract.minDstGasLookup(138, 0);
  const amt = ethers.utils.parseUnits(amount, decimals);
  const adapterParams = AdapterParams.forV1(Number(dstGasLimit));
  const nativeFee = (await contract.estimateBridgeFee(false, "0x")).nativeFee;
  console.log(`Native fee: ${nativeFee}`);
  const increasedNativeFee = BigInt(Number(nativeFee) * 1.2); // 20% increase
  const callParams = {
    refundAddress: address,
    zroPaymentAddress: ethers.constants.AddressZero,
  };
  const tx = await contract.bridge(
    tokenAddres,
    amt,
    address,
    callParams,
    serializeAdapterParams(adapterParams),
    { value: increasedNativeFee }
  );
  await tx.wait();
  console.log(`Bridged ${tx.hash}`);
  return tx.hash;
};
