import {type AppConfigLike, createAppConfig} from '@layerzerolabs/ui-app-config';
import config from './config.json';

export const appConfig = createAppConfig(config as AppConfigLike);

export const CONFIG = {
    fuseRPC: 'https://rpc.fuse.io',
  };