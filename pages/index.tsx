import { useState } from "react";
import WalletConnectClient from "@walletconnect/client";
import { CLIENT_EVENTS } from "@walletconnect/client";
import { PairingTypes, SessionTypes, SequenceTypes } from "@walletconnect/types";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import { Client } from "@walletconnect/client/dist/cjs/client";
import { IAppState } from "../types/interfaces";
import Button from "@mui/material/Button";
import CableIcon from "@mui/icons-material/Cable";
import Layout from "../layouts/layout";
import Balances from "../components/Balances/balances";
import emitter from "../lib/utils/eventEmitter";

const INITIAL_STATE: IAppState = {
  client: undefined,
  session: undefined,
  chains: [],
  pairings: [],
  accounts: [],
  fetching: false,
}

export default function Home() {
  const [accounts, setAccounts] = useState(undefined);

  let localState: IAppState = {
    ...INITIAL_STATE,
  };

  async function init() {
    localState.client = await WalletConnectClient.init({
      projectId: "156eca5477f3005d97f695a65f7cab6e",
      relayUrl: "wss://relay.walletconnect.com",
      metadata: {
        name: "MintGoldDust-NextJS-Exercise",
        description: "Example Dapp",
        url: "https://walletconnect.org/",
        icons: ["https://walletconnect.com/walletconnect-logo.png"],
      },
    });
    attachListeners(localState.client);
    checkConnectedSessions();

    emitter.on("disconnect", disconnect);
  }

  async function connect() {
    try {
      const session = (await localState.client.connect({
        permissions: {
          blockchain: {
            chains: ["eip155:42"],
          },
          jsonrpc: {
            methods: [
              "eth_sendTransaction",
              "personal_sign",
              "eth_signTypedData",
            ],
          },
        },
      })) as any;

      WalletConnectQRCodeModal.close();
      onSessionConnected(session);
    } catch (error) {
      console.error(error);
    }
  }

  function attachListeners(client: Client) {
    if (client) {
      client.on(
        CLIENT_EVENTS.pairing.proposal,
        async (proposal: PairingTypes.Proposal) => {
          // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
          const { uri } = proposal.signal.params;
          WalletConnectQRCodeModal.open(uri, (res) => {
            console.log("modal open", res);
          });
        }
      );

      client.on(
        CLIENT_EVENTS.pairing.created,
        async (created: PairingTypes.Settled) => {
          console.log("created", created);
          localState.pairings = localState.client.pairing.topics;
        }
      );

      client.on(
        CLIENT_EVENTS.session.deleted,
        async (session: SessionTypes.Settled) => {
          if (session.topic !== localState.session?.topic) return;
          console.log("EVENT", "session_deleted");
          resetApp();
        }
      );
    }
  }

  async function checkConnectedSessions() {
    if (typeof localState.client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof localState.session !== "undefined") return;
    if (localState.client.session.topics.length) {
      const session = await localState.client.session.get(
        localState.client.session.topics[0]
      );
      const chains = session.state.accounts.map(
        (account) => account.split(":")[1]
      );
      localState.accounts = session.state.accounts;
      setAccounts(session.state.accounts);
      localState.chains = chains;
      onSessionConnected(session);
    }
  }

  async function onSessionConnected(session: SessionTypes.Created) {
    localState.session = session;
    onSessionUpdate(
      session.state.accounts,
      session.permissions.blockchain.chains
    );
  }

  function onSessionUpdate(accounts: string[], chains: string[]) {
    localState.accounts = accounts;
    setAccounts(accounts);
    localState.chains = chains;
  }

  async function disconnect() {
    if (typeof localState.client === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    if (typeof localState.session === "undefined") {
      console.log("Session is not connected");
      return;
    }
    await localState.client.disconnect({
      topic: localState.session.topic,
      reason: "User disconnected session",
    });
  }

  function resetApp() {
    const { client } = localState;
    localState = ({ ...INITIAL_STATE, client });
    setAccounts(undefined)
    location.reload();
  }

  init();

  if (accounts && accounts.length) {
    return (
      <Layout>
        <Balances accounts={accounts} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Button
          variant="contained"
          sx={{ borderRadius: 0 }}
          onClick={connect}
          endIcon={<CableIcon />}
        >
          Connect
        </Button>
      </Layout>
    );
  }
}
