import React from "react";
import { redirect } from "next/navigation";

const Admin = ({}) => {
  redirect("/admin/product-list");
};

export default Admin;
