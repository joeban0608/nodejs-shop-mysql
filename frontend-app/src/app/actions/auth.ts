"use server";

export async function signUp(prevState: any, formData?: FormData) {
  try {
    const rawFormData = {
      email: formData?.get("email"),
      password: formData?.get("password"),
      confirmPassword: formData?.get("confirmPassword"),
    };

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // 後端有擋密碼錯誤這段可以拿掉
    // if (rawFormData.password !== rawFormData.confirmPassword) {
    //   console.log("rawFormData.password", rawFormData.password);
    //   console.log("rawFormData.confirmPassword", rawFormData.confirmPassword);
    //   return {
    //     message: null,
    //     error: "password is incorrect",
    //   };
    // }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawFormData),
    };
    const res = await fetch(
      "http://localhost:8000/auth/sign-up",
      requestOptions
    );
    console.log("res", res);
    if (!res.ok) {
      const resError = await res.json();
      throw new Error(resError.error);
    }
    const SiguUpRes = res.json();
    console.log("SiguUpRes", SiguUpRes);
    return {
      message: "Success to Create User",
      error: null,
    };
  } catch (err: any) {
    console.log("Sign up Form action Err:", err);
    return {
      message: null,
      error: `Sign up Form action Err: ${err.message}`,
    };
  }
}
