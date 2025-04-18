import axios from "axios";
import { Button } from "components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";


function HomePage() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const response = await axios.get("api/");
  //       setData(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetch();
  // })
  return (
    <div className="grid flex-1 place-content-center">
    </div>
  );
}

export default HomePage;