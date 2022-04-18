import { IronSessionData } from "iron-session";
import { withIronSessionSsr } from "iron-session/next";
import { isPast, parseISO, parseJSON } from "date-fns";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="layout w-full flex grow justify-center py-2">
        {children}
      </div>
      <Footer />
    </div>
  );
}
