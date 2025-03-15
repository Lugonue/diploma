import axios from "axios";
import { useEffect, useState } from "react";


function HomePage() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("api/");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  })
  return (
    <div className="grid flex-1 place-content-center">
      <h3 className="text-2xl font-semibold">Сообщение с бэка</h3>
      <pre className="italic">{data}</pre>
    </div>
  );
}

export default HomePage;