import React from "react";

const DangerousText = ({ text }: { text: string }) => {
  return text && <p className="text-sm text-red-600">{text}</p>;
};

export default DangerousText;
