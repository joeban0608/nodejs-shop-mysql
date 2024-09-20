"use client";
import React, { useEffect } from "react";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.log("error", error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
};

export default ErrorPage;
