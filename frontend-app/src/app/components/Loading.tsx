import React from "react";
import { Cog } from "lucide-react";
const Loading = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 "
      disabled
    >
      <Cog className="h-6 w-6 animate-spin" />
      <span className="text-lg">Loading...</span>
    </button>
  );
};

export default Loading;
