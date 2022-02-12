import useSWR from "swr";

const fetcher = (url) =>
    fetch(url, {
      mode: "cors",
    }).then((res) => res.json());

export function useBalances(account: string) {
  
    const [net, chainId, address] = account.split(":");
    const API = `https://ethereum-api.xyz/account-assets?address=${address}&chainId=${chainId}`;
    const { data, error } = useSWR(API, fetcher);

  return {
    address,
    balance: data,
    isLoading: !error && !data,
    isError: error,
  };
}
