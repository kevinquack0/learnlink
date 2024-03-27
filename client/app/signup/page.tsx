"use client";
// import "./signup.scss";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Signup.module.scss";
import { Button, Input } from "semantic-ui-react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { useAccount } from "@/context/AccountContext";

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email validation regex
  return re.test(String(email).toLowerCase());
};

export default function page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [secondMajor, setSecondMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [classes, setClasses] = useState("");
  const [password, setPassword] = useState("");
  const { updateAccountId } = useAccount();
  //   const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailCheckInProgress, setEmailCheckInProgress] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const { data, loading, error, fetchData } = useFetch(
    "/users/register",
    "POST",
    updateAccountId
  );

//   useEffect(() => {
//     // If the backend returns an account ID, it means registration was successful.
//     if (data?.accountId) {
//       router.push("/dashboard");
//     }
//     // For example, if the error message indicates that the email is taken, you could update isEmailUnique.
//     if (error?.message === 'Email is already registered.') {
//       setIsEmailUnique(false);
//     }
//   }, [data, error, router]);


  useEffect(() => {
    if (data) {
      router.push("/dashboard");
    }
  }, [data, router]);

  useEffect(() => {
    if (email) {
      setEmailError(
        isValidEmail(email) ? "" : "Please enter a valid email address."
      );
    }
  }, [email]);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);


  const handleSignUp = () => {
    if (!emailError && email && name && major && classes && password) {
      fetchData({
        name,
        email,
        major,
        second_major: secondMajor,
        minor,
        classes: classes.split(","),
        password,
      });
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto max-h-[100px]"
          src="\learnlink-logo.webp"
          alt="Learnlink"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Join Learnlink today!
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8">
        <label
          htmlFor="name"
          className={`block text-sm font-medium leading-5 text-gray-700 ${styles.requiredField}`}
        >
          Name <span style={{ color: "red" }}>*</span>
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            value={name}
            type="text" // Specify the type, e.g., text, email, etc.
            autoComplete="name" // Helps with autofill
            required // Makes the field mandatory
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
            // className="appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
            // className={`appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${styles.requiredInput}`}
            onChange={(e) => setName(e.target.value)} // Replace setUsername with your state setter
          />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email <span style={{ color: "red" }}>*</span>
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // type="email" // Specify the type, e.g., text, email, etc.
            autoComplete="email"
            required
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2 ${
              emailError
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
            placeholder="you@example.com"
            aria-invalid={emailError ? "true" : "false"}
            aria-describedby="email-error"
          />
          {emailError && (
            <p className="mt-2 text-sm text-red-600 ml-20" id="email-error">
              {emailError}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8">
        <label
          htmlFor="major"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Major <span style={{ color: "red" }}>*</span>
        </label>
        <div className="mt-2">
          <input
            id="major"
            name="major"
            type="text" // Specify the type, e.g., text, email, etc.
            autoComplete="major"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8">
        <label
          htmlFor="secondmajor"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Second Major (if applicable)
        </label>
        <div className="mt-2">
          <input
            id="secondmajor"
            name="second major"
            type="text" // Specify the type, e.g., text, email, etc.
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
            onChange={(e) => setSecondMajor(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8">
        <label
          htmlFor="minor"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Minor (if applicable)
        </label>
        <div className="mt-2">
          <input
            id="minor"
            name="minor"
            type="text" // Specify the type, e.g., text, email, etc.
            autoComplete="minor"
            // required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
            onChange={(e) => setMinor(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-8">
        <label
          htmlFor="classes"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Classes <span style={{ color: "red" }}>*</span>
        </label>
        <div className="mt-2">
          <input
            id="classes"
            name="classes"
            type="text" // Specify the type, e.g., text, email, etc.
            autoComplete="classes"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
            onChange={(e) => setClasses(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-16">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password <span style={{ color: "red" }}>*</span>
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password" // Specify the type, e.g., text, email, etc.
            autoComplete="password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm h-8 pb-5">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Confirm Password <span style={{ color: "red" }}>*</span>
        </label>
        <div className="mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
              confirmPasswordError ? "ring-red-500" : "ring-gray-400"
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6 pl-2`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {confirmPasswordError && (
          <p className="mt-2 text-sm text-red-600" id="confirm-password-error">
            {confirmPasswordError}
          </p>
        )}
      </div>

      <div className="flex w-full justify-center mt-10 ">
        <button
          type="submit"
        //   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        className='w-96 mt-5 rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 text-sm text-white shadow-sm bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400'  
        onClick={handleSignUp}
          disabled={loading || !email || !!emailError} // Disabled if loading, no email entered, or there is an email error
        >
          Signup
        </button>
      </div>

      <div className="flex w-full justify-center mt-4">
        <button
          className="font-semibold text-blue-400 hover:text-blue-500"
          onClick={() => {
            router.push("/home");
          }}
        >
          Return to home.
        </button>
      </div>
    </div>

    // <div className={`w-full h-screen flex justify-center items-center ${styles.background}`}>
    //     <div className={styles.formWrapper}>
    //         <Input placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
    //         <Input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
    //         <Input placeholder='major' value={major} onChange={(e) => setMajor(e.target.value)} />
    //         <Input placeholder='second major' value={secondMajor} onChange={(e) => setSecondMajor(e.target.value)} />
    //         <Input placeholder='minor' value={minor} onChange={(e) => setMinor(e.target.value)} />
    //         <Input placeholder='classes' value={classes} onChange={(e) => setClasses(e.target.value)} />
    //         <Input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
    //         <Button secondary onClick={() => {
    //             fetchData({ name, email, major, second_major: secondMajor, minor, classes: classes.split(','), password })

    //         }} >
    //             Signup
    //         </Button>
    //     </div>
    // </div>
  );
}
