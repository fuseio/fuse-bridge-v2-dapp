import { Signer, ethers } from "ethers";
import { ERC20ABI } from "../constants/types/ERC20";
import { WrappedERC20 } from "../constants/types/WrappedERC20";
import { web3OnboardProvider } from "./provider";

const getERC20Contract = (
  address: string,
  signerOrProvider: Signer | ethers.providers.Provider | undefined
) => {
  const contract = new ethers.Contract(
    address,
    ERC20ABI,
    signerOrProvider
  ) as unknown as WrappedERC20;
  return contract;
};

export const getERC20Balance = async (
  contractAddress: string,
  address: string
) => {
  const contract = getERC20Contract(contractAddress, web3OnboardProvider);
  const balance = await contract.balanceOf(address);
  return balance;
};

export const getERC20Allowance = async (
  contractAddress: string,
  address: string,
  spender: string
) => {
  const contract = getERC20Contract(contractAddress, web3OnboardProvider);
  const allowance = await contract.allowance(address, spender);
  return allowance;
};

export const increaseAllowance = async (
  address: string,
  spender: string,
  amount: string,
  decimals: number = 18
) => {
  const contract = getERC20Contract(address, web3OnboardProvider);
  const tx = await contract.increaseAllowance(
    spender,
    ethers.utils.parseUnits(amount, decimals)
  );
  await tx.wait();
  return tx.hash;
};
