"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signUp } from "../actions/auth";
import Loading from "../components/Loading";
const initialState = {
  message: "",
  error: null,
};

const SignUpForm = () => {
  const [state, formAction] = useFormState(signUp, initialState);
  return (
    <form
      action={formAction}
      className="bg-white p-6 rounded shadow-md w-80 text-black"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="">
        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      {state?.error ? (
        <p className="py-2 text-red-500">{state.error}</p>
      ) : (
        <p className="py-2">{state.message}</p>
      )}
      <SubmitButton />
    </form>
  );
};

export default SignUpForm;

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors flex justify-center"
    >
      {pending ? <Loading /> : "Sign Up"}
    </button>
  );
}
