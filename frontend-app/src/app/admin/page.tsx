import { redirect } from "next/navigation";

const Admin = async ({}) => {
  redirect("/admin/product-list");
};

export default Admin;
