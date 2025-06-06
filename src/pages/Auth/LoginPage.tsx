import axios from "axios";
import type { Token } from "@/types/Auth/auth";
import { URL } from "@/utils/constant";
import React, { useState } from "react";
import { useNavigate } from "react-router";
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
import { LoaderCircle } from "lucide-react";

function LoginPage() {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [animate, setAnimate] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setAnimate(true);
    e.preventDefault();

    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post<Token>(`${URL}token/`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { access, role } = response.data;
        console.log(access);
        localStorage.setItem("token", access);
        localStorage.setItem("role", role);
        setPassword("");
        setUsername("");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setAnimate(false);
      setError(true);
    }
  };
  return (
    <section className="w-full h-screen px-5 flex justify-center items-center bg-secondary">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              onClick={() => navigate("/signup")}
              className="cursor-pointer"
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="eg:johndoe"
                  required
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </form>
          {error ? (
            <p className="text-sm font-light pt-1 text-red-700">
              wrong credentials
            </p>
          ) : (
            ""
          )}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer"
            form="loginForm"
          >
            {animate ? <LoaderCircle className="animate-spin" /> : ""}
            Login
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default LoginPage;
