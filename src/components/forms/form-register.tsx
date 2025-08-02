"use client";

import { useEffect, useRef, useState } from "react";
import FormGroup from "./form-group";
import RoundedButton from "../ui/btn-rounded";
import Message from "../message";
import Spinner from "../spinner";
import ConfettiExplosion from "react-confetti-explosion";
import Link from "next/link";

type Labels = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  submit: string;
};

type helperText = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Links = {
  forgotPassword: string;
  back: string;
};

type ReturnCase = {
  usernameExists: string;
  emailExists: string;
  successCase: string;
  errorCase: string;
  passNotMatchCase: string;
};

export default function RegisterForm({
  labels,
  helperText,
  links,
  returnCase,
}: {
  labels: Labels;
  helperText: helperText;
  links: Links;
  returnCase: ReturnCase;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const messageRef = useRef<HTMLDivElement>(null);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (message) {
      messageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [message]);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (success) return;

    setIsSubmit(true);
    setIsLoading(true);
    if (formData.password !== formData.confirm_password) {
      setMessage(returnCase.passNotMatchCase);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error("Registration failed!");
      }
      console.log(result);

      if (!result.success && result.case === "username-already-exists") {
        setMessage(returnCase.usernameExists);
      } else if (!result.success && result.case === "email-already-exists") {
        setMessage(returnCase.emailExists);
      } else if (result.success && result.case === "created") {
        setSuccess(result.success);
        setMessage(returnCase.successCase);
      } else {
        setMessage(returnCase.errorCase);
      }
    } catch (err) {
      setSuccess(false);
      setMessage(returnCase.errorCase);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[30vw] h-full justify-center items-center py-14 px-14 text-white/50 border border-white/20"
      >
        <section className="flex flex-col md:flex-row justify-center md:space-x-24">
          <div>
            <FormGroup
              htmlFor="username"
              elementType="input"
              type="username"
              name="username"
              onChange={handleOnChange}
              minLength={4}
              maxLength={20}
              describedBy="usernameHelp"
              helperText={helperText.username}
              required={true}
            >
              {labels.username}
            </FormGroup>
            <FormGroup
              htmlFor="email"
              elementType="input"
              type="email"
              name="email"
              onChange={handleOnChange}
              maxLength={80}
              describedBy="emailHelp"
              helperText={helperText.email}
              required={true}
            >
              {labels.email}
            </FormGroup>

            <FormGroup
              htmlFor="password"
              elementType="input"
              type="password"
              name="password"
              onChange={handleOnChange}
              minLength={8}
              maxLength={100}
              describedBy="passwordHelp"
              helperText={helperText.password}
              required={true}
            >
              {labels.password}
            </FormGroup>

            <FormGroup
              htmlFor="confirm-password"
              elementType="input"
              type="password"
              name="confirm_password"
              onChange={handleOnChange}
              minLength={8}
              maxLength={100}
              describedBy="passwordConfirmHelp"
              helperText={helperText.confirmPassword}
              required={true}
            >
              {labels.confirmPassword}
            </FormGroup>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center w-full">
          {!success && (
            <>
              <RoundedButton type="submit" disabled={success && isSubmit}>
                {isLoading ? <Spinner /> : labels.submit}
              </RoundedButton>
            </>
          )}
          <>
            {success && (
              <ConfettiExplosion
                className="confetti-explosion-container-0-2-108"
                particleCount={200}
                force={2.0}
                width={2000}
                duration={6000}
              />
            )}
          </>
          <Message ref={messageRef} success={success} message={message} />
        </section>
      </form>
      <section className="flex flex-row gap-x-6 mt-4 text-sm text-white/60">
        <Link href="/forgot">{links.forgotPassword}</Link>
        <Link href="/">{links.back}</Link>
      </section>
    </>
  );
}
