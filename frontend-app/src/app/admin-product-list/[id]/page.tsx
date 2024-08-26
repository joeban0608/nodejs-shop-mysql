import React from "react";

const AdminProductPage = async ({ params }: { params: { id: string } }) => {
  const pid = params.id;
  return <div>{pid}</div>;
};

export default AdminProductPage;
