import { Outlet } from "react-router";
import Navigation from "../components/Navigation";
import { useDispatch } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { loadUserCart } from "@/lib/features/cartSlice";

function RootLayout() {
  const dispatch = useDispatch();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      dispatch(loadUserCart());
    }
  }, [isSignedIn, dispatch]);

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default RootLayout;
