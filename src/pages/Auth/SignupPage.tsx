import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { URL } from "@/utils/constant";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SignupPage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState<Boolean>(false);
  const [email, setEmail] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");

  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setAnimate(true);
    e.preventDefault();

    const payload = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await axios.post(`${URL}signup/`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      setAnimate(false);
    }
  };
  return (
    <section className="w-full h-screen px-5 flex justify-center items-center bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your credentials below to create your account
          </CardDescription>
          <CardAction>
            <Button
              onClick={() => navigate("/login")}
              variant="link"
              className="cursor-pointer"
            >
              Log In
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="signup_form" onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsername(e.target.value);
                  }}
                  id="email"
                  type="text"
                  placeholder="eg:johndoe"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                </div>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirmPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  required
                  className={`${
                    confirmPassword
                      ? confirmPassword != password
                        ? "border-red-300"
                        : ""
                      : ""
                  }`}
                />
                {confirmPassword ? (
                  confirmPassword != password ? (
                    <p className="font-light text-red-500 text-sm ">
                      password does not match
                    </p>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={
              confirmPassword
                ? confirmPassword != password
                  ? true
                  : false
                : false
            }
            type="submit"
            className="w-full cursor-pointer"
            form="signup_form"
          >
            {animate ? <LoaderCircle /> : ""}
            Signup
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default SignupPage;
