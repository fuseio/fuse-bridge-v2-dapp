import { Signer, ethers } from "ethers";
import { WrappedTokenBridgeAbi } from "../constants/types/WrappedTokenBridge";
import { web3OnboardProvider } from "./provider";
import { AdapterParams } from "@layerzerolabs/ui-core";
import { serializeAdapterParams } from "@layerzerolabs/ui-evm";

const getWrappedTokenBridge = (
  contractAddress: string,
  signerOrProvider: Signer | ethers.providers.Provider | undefined
) => {
  const contract = new ethers.Contract(
    contractAddress,
    WrappedTokenBridgeAbi,
    signerOrProvider
  );
  return contract;
};

export const bridgeWrapped = async (
  bridgeAddress: string,
  address: string,
  tokenAddres: string,
  amount: string,
  decimals: number,
  lzChainId: number
) => {
  const contract = getWrappedTokenBridge(bridgeAddress, web3OnboardProvider);
  const dstGasLimit = await contract.minDstGasLookup(lzChainId, 1);
  const amt = ethers.utils.parseUnits(amount, decimals);
  const adapterParams = AdapterParams.forV1(Number(dstGasLimit));
  const nativeFee = (await contract.estimateBridgeFee(lzChainId, false, "0x"))
    .nativeFee;
  console.log(`Native fee: ${nativeFee}`);
  const increasedNativeFee = BigInt(Number(nativeFee) * 1.2); // 20% increase
  const callParams = {
    refundAddress: address,
    zroPaymentAddress: ethers.constants.AddressZero,
  };
  const tx = await contract.bridge(
    tokenAddres,
    lzChainId,
    amt,
    address,
    false,
    callParams,
    serializeAdapterParams(adapterParams),
    { value: increasedNativeFee }
  );
  await tx.wait();
  console.log(`Bridged ${tx.hash}`);
  return tx.hash;
};