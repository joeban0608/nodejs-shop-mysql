"use server";
export async function signUp(prevState: any, formData?: FormData) {
  // console.log("prevState", prevState);
  // console.log("formData", formData);
  const rawFormData = {
    email: formData?.get("email"),
    password: formData?.get("password"),
    confirmPassword: formData?.get("confirmPassword"),
  };

  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (rawFormData.password !== rawFormData.confirmPassword) {
    console.log("rawFormData.password", rawFormData.password);
    console.log("rawFormData.confirmPassword", rawFormData.confirmPassword);
    return {
      message: null,
      error: "password is incorrect",
    };
  }

  return {
    message: "Success to Create User",
    error: null,
  };
}
