import { init } from "@web3-onboard/react";
import fuseLogo from "../assets/fuselogo.svg";
import whiteFuseLogo from "../assets/fuse-logo-white.svg";
import fuseIcon from "../assets/fuse.png";
import fuseToken from "../assets/tokenLogo";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import ledgerModule from "@web3-onboard/ledger";
import torusModule from "@web3-onboard/torus";
import trezorModule from "@web3-onboard/trezor";
import walletConnectModule from "@web3-onboard/walletconnect";
import transactionPreviewModule from "@web3-onboard/transaction-preview";
import injectedModule from "@web3-onboard/injected-wallets";
import { chainConfig } from "../constants/config";

const transactionPreview = transactionPreviewModule({
  requireTransactionApproval: true,
});

const walletConnect = walletConnectModule({
  version: 2,
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string,
  requiredChains: [122],
});

const trezor = trezorModule({
  email: "hello@fuse.io",
  appUrl: "https://staking.fuse.io",
});

const torus = torusModule();
const ledger = ledgerModule();
const coinbaseWalletSdk = coinbaseWalletModule();

const fuse = {
  id: "0x7A",
  token: "Fuse",
  label: "Fuse Mainnet",
  rpcUrl: "https://rpc.fuse.io",
  icon: fuseToken,
};

const otherChains = chainConfig.chains.map((chain) => {
  return {
    id: "0x" + chain.chainId.toString(16),
    token: chain.chainName,
    label: chain.chainName,
    rpcUrl: chain.rpc,
    icon: chain.icon,
  };
});

const chains = [fuse, ...otherChains];

const wallets = [
  injectedModule(),
  coinbaseWalletSdk,
  walletConnect,
  torus,
  ledger,
  trezor,
];

export const web3Onboard = init({
  theme: "dark",
  transactionPreview,
  apiKey: import.meta.env.VITE_BLOCKNATIVE_API_KEY as string,
  wallets,
  chains,
  appMetadata: {
    name: "Fuse Bridge",
    icon: fuseIcon,
    logo: whiteFuseLogo,
    description:
      "The Fuse Staking Dapp enables users to participate in the Fuse network's consensus by staking FUSE tokens.",
  },
  accountCenter: {
    desktop: {
      enabled: true,
    },
    mobile: {
      enabled: true,
    },
  },
  connect: {
    iDontHaveAWalletLink: "https://fuse.io/ecosystem",
    disableUDResolution: true,
    autoConnectLastWallet: true,
  },
});
