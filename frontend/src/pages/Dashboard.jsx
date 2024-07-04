import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Round balance to 2 decimal points
        const roundedBalance = parseFloat(response.data.balance).toFixed(2);
        setBalance(roundedBalance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFirstName(response.data.firstName);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchBalance();
    fetchUserInfo();
  }, []);

  return (
    <div>
      <Appbar firstName={firstName} />
      <div className="m-8">
        {balance !== null ? (
          <Balance value={balance} />
        ) : (
          <p>Loading balance...</p>
        )}
        <Users />
      </div>
    </div>
  );
};

///////////////////////////////////////////////////////////////
// import { Appbar } from "../components/Appbar";
// import { Balance } from "../components/Balance";
// import { Users } from "../components/Users";

// export const Dashboard = () => {
//   return (
//     <div>
//       <Appbar />
//       <div className="m-8">
//         <Balance value={"10,000"} />
//         <Users />
//       </div>
//     </div>
//   );
// };
