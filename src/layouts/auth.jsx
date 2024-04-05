import { Spinner } from "@material-tailwind/react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "@/routes";
import { useSelector, useDispatch } from "react-redux";
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


export function Auth() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
      dispatch(keepLoggedIn());
    } else {
      dispatch(loggedOut());
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
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(({ layout, pages }) =>
          layout === "auth" &&
          pages.map(({ path, element }) => (
            <Route
              key={path}
              exact
              path={path}
              element={
                path === "/sign-in" && isLoggedIn ? (
                  <Navigate to="/dashboard/home" />
                ) : (
                  element
                )
              }
            />
          ))
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
