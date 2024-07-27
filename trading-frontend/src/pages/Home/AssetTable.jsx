import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";

const AssetTable = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Coin</TableHead>
          <TableHead>SYMBOL</TableHead>
          <TableHead>VOLUME</TableHead>
          <TableHead>MARKET CAP</TableHead>
          <TableHead>24H</TableHead>
          <TableHead className="text-right">PRICE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cryptoData.map((crypto) => (
          <TableRow key={crypto.id}>
            <TableCell className="font-medium flex items-center gap-2">
              <Avatar className="-z-50">
                <AvatarImage className="size-12" src={crypto.image} />
              </Avatar>
              <span>{crypto.name}</span>
            </TableCell>
            <TableCell>{crypto.symbol.toUpperCase()}</TableCell>
            <TableCell>{crypto.total_volume}</TableCell>
            <TableCell>{crypto.market_cap}</TableCell>
            <TableCell>{crypto.price_change_percentage_24h}</TableCell>
            <TableCell className="text-right">
              ${crypto.current_price}
            </TableCell>
            {/* Use appropriate field */}
            {/* Add more TableCells as per your data requirements */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AssetTable;
