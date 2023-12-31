import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Head from "next/head";
import axios from "axios";

export default function Home({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [idToken, setIdToken] = useState();

  useEffect(async () => {
    const liff = (await import("@line/liff")).default;
    try {
      await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
    } catch (error) {}
    await liff.ready;
    if (!liff.isLoggedIn()) {
      liff.login();
    }
    const idToken = await liff.getIDToken();
    setIdToken(idToken);
  }, [idToken]);

  const onSubmit = async (data) => {
    await axios({
      method: "post",
      url: "https://ac0d-202-183-226-2.ngrok-free.app/workshop-l/asia-northeast1/workshop-auth",
      headers: {
        Authorization: idToken,
      },
      data: {
        phoneNumber: data.phoneNumber,
      },
    });
  };

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        class="bg-gray-50 dark:bg-gray-900"
        style={{ paddingTop: "2rem" }}
      >
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              class="w-20 h-20 object-cover p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              src="/logo.png"
              alt="logo"
            />
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register("phonenumber", { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create an account
                </button>
                {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                </p>
                <button
                  type="submit"
                  class="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Line login
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
