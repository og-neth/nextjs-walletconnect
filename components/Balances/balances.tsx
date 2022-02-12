import Balance from "./balance";

export default function Balances({ accounts }) {
  if (!accounts) {
    return null;
  }

  const balancesList = accounts.map((account, index) => (
    <Balance key={index} account={account} />
  ));

  return <div>{balancesList || "nothing to see here"}</div>;
}
