import { PairingTypes, SessionTypes, ClientTypes } from "@walletconnect/types";
import { Client } from "@walletconnect/client/dist/cjs/client";

export interface IAppState {
  client: Client | undefined;
  session: SessionTypes.Created | undefined;
  chains: string[];
  accounts: string[];
  pairings: string[];
  fetching: boolean;
}
