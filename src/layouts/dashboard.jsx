import { Spinner } from "@material-tailwind/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useDentalControllerProvider, setOpenConfigurator } from "@/context";
import { useDispatch } from "react-redux";
import { keepLoggedIn, loggedOut } from "@/features";
import { useEffect, useState } from "react";



// async function verifyToken(token) {
//   try {
//     const response = await axios.post('https://healthcare.reebaprogrammer.online/api/Accounts/VerifyToken', null, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.ok;
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return false;
//   }
// }

export function Dashboard() {
  const [controller, dispatch] = useDentalControllerProvider();
  const { sidenavType } = controller;
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const checkAuthentication = async () => {
  //     if (token) {
  //       const isTokenValid = await verifyToken(token);
  //       if (isTokenValid) {
  //         dispatch(keepLoggedIn());
  //       } else {
  //         dispatch(loggedOut());
  //       }
  //     } else {
  //       dispatch(loggedOut());
  //     }
  //   };
  //   checkAuthentication();
  // }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      reduxDispatch(keepLoggedIn());
    } else {
      reduxDispatch(loggedOut());
      navigate("/auth/sign-in");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spinner color="blue" className="h-8 w-8"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark"
            ? "/img/logo-ct.png"
            : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
