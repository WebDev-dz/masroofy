
import { cn } from "../../../lib/utils"
import { buttonVariants } from "../../../components/ui/button"
import { Icons } from "../../../components/icons"
import { Link } from "react-router-dom"
import {  SignIn, useSignIn } from "@clerk/clerk-react"
import { useCallback, useState } from "react"
import { UserAuthForm } from "../../../components/user-auth-form"



export default function LoginPage() {

  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
 
  // const onSignInPress = useCallback(async () => {
  //   if (!isLoaded) return;

  //   try {
  //     const signInAttempt = await signIn.create({
  //       identifier: form.email,
  //       password: form.password,
  //     });

  //     if (signInAttempt.status === "complete") {
  //       await setActive({ session: signInAttempt.createdSessionId });
        
  //       // router("/" as any);
  //     } else {
  //       console.log(JSON.stringify(signInAttempt, null, 2));
  //       alert("Error"  + "  Log in failed. Please try again.");
  //     }
  //   } catch (err: any) {
  //     console.log(JSON.stringify(err, null, 2));
  //     alert("Error  " + err.errors[0].longMessage);
  //   }
  // }, [isLoaded, form]);
  
  
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <SignIn />
        {/* <UserAuthForm /> */}
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            to="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
