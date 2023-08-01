import { Provider, Signer, ethers } from "ethers";
import { ERC20ABI } from "../constants/types/ERC20";
import { web3OnboardProvider } from "./provider";

export const getERC20Contract = (
  address: string,
  signerOrProvider: Signer | Provider | null
) => {
  const contract = new ethers.Contract(address, ERC20ABI, signerOrProvider);
  return contract;
};

export const getERC20Balance = async (
  contractAddress: string,
  address: string,
  decimals: number = 18
) => {
  const contract = getERC20Contract(contractAddress, web3OnboardProvider);
  const balance = await contract.balanceOf(address);
  return ethers.formatUnits(balance, decimals);
};

export const getERC20Allowance = async (
  address: string,
  spender: string,
  decimals: number = 18
) => {
  const contract = getERC20Contract(address, web3OnboardProvider);
  const allowance = await contract.allowance(address, spender);
  return ethers.formatUnits(allowance, decimals);
};

export const increaseAllowance = async (
  address: string,
  spender: string,
  amount: number,
  decimals: number = 18
) => {
  const contract = getERC20Contract(address, web3OnboardProvider);

  const tx = await contract.increaseAllowance(
    spender,
    ethers.parseUnits(amount.toString(), decimals)
  );
  await tx.wait();
  return tx.hash;
};
