import {
    Outlet,
    Link,
    useLoaderData,
    useLocation,
  } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { getContacts } from "./contact";
import logo from "../img/TCR_Main_Logo.png";

// export async function loader() {
//   const contacts = await getContacts();
//   return { contacts };
// }

export default function Root() {
  const location = useLocation();

    return (
      <div className="container">
        <main>
          <div className="logo-container">
            <img class="logo" src={logo}></img>
          </div>
        </main>
      </div>
    );
  }