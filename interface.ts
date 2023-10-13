export interface Root {
  webhookId: string;
  id: string;
  createdAt: string;
  type: string;
  event?: any;
  text: string;
}

export enum StatusEnum {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
}

export type EventType =
  | AddressActivityEvent
  | NFTActivityEvent
  | MinedTransactionActivityEvent;

// Address Activity
export interface AddressActivityEvent {
  network: string;
  activity: AddressActivity[];
}

export interface AddressActivity {
  fromAddress: string;
  toAddress: string;
  blockNum: string;
  hash: string;
  erc1155Metadata?: Erc1155Metadata[];
  category: string;
  rawContract: RawContract;
  log: Log;
  value?: number;
  asset?: string;
  erc721TokenId?: string;
}

// NFT Activity
export interface NFTActivityEvent {
  network: string;
  activity: NFTActivity[];
}

export interface NFTActivity {
  fromAddress: string;
  toAddress: string;
  contractAddress: string;
  blockNum: string;
  hash: string;
  erc1155Metadata: Erc1155Metadata[];
  category: string;
  log: Log;
}

export interface Erc1155Metadata {
  tokenId: string;
  value: string;
}

export interface RawContract {
  rawValue: string;
  address: string;
}

export interface Log {
  removed: boolean;
  address: string;
  data: string;
  topics: string[];
  blockNumber?: string;
  transactionHash?: string;
  transactionIndex?: string;
  blockHash?: string;
  logIndex?: string;
}

export interface MinedTransactionActivityEvent {
  appId: string;
  network: string;
  transaction: Transaction;
}

export interface Transaction {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
}
