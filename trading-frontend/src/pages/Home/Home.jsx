import { useState } from "react";
import { Button } from "../../components/ui/button";
import AssetTable from "./AssetTable";
import CryptoChart from "./CryptoChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { MessageCircle } from "lucide-react";

const Home = () => {
  const [category, setCategory] = useState("all");

  const handleCategory = (value) => {
    setCategory(value);
  };

  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[50%] lg:border-r">
          <div className="p-3 flex items-center gap-4">
            <Button
              onClick={() => handleCategory("all")}
              variant={category == "all" ? "default" : "outline"}
              className="rounded-full"
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")}
              variant={category == "top50" ? "default" : "outline"}
              className="rounded-full"
            >
              Top 50
            </Button>

            <Button
              onClick={() => handleCategory("topGainer")}
              variant={category == "topGainer" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Gainers
            </Button>

            <Button
              onClick={() => handleCategory("topLosers")}
              variant={category == "topLosers" ? "default" : "outline"}
              className="rounded-full"
            >
              Top Losers
            </Button>
          </div>
          <AssetTable />
        </div>
        <div className="hidden lg:block lg-w[50%] p-5">
          <CryptoChart />
          <div className="flex gap-5 items-center">
            <div>
              <Avatar>
                <AvatarImage
                  className="size-12"
                  src={
                    "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                  }
                />
              </Avatar>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p>BTC</p>
                <p className="text-gray-400">BitCoin</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">$68767</p>
                <p className="text-green-600">
                  <span>1356988043927</span>
                  <span>(+1.825)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="fixed bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
        <div className="relative w-[10rem] cursor-pointer group">
            <Button className="w-full h-[3rem] gap-2 items-center">
              <MessageCircle className="fill-[#e1e0f0] -rotate-90 stroke-none group-hover:fill-[#4f91b5]"/>
              <span className="text-2xl">Chat Bot</span>
            </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
