"use client";

import { useEffect, useRef, useState } from "react";
import FormGroup from "./form-group";
import RoundedButton from "../ui/btn-rounded";
import Message from "../message";
import Spinner from "../spinner";
import ConfettiExplosion from "react-confetti-explosion";

type Labels = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  submit: string;
};

type ReturnCase = {
  emailNotFound: string;
  successCase: string;
  errorCase: string;
};

export default function ForgotForm({
  labels,
  returnCase,
}: {
  labels: Labels;
  returnCase: ReturnCase;
}) {
  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
    confirm_new_password: "",
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
    if (formData.new_password !== formData.confirm_new_password) {
      /// must fix bg/en
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://next-zadanie.vercel.app/api/auth/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error("Registration failed!");
      }

      if (!result.success && result.case === "email-not-found") {
        setMessage(returnCase.emailNotFound);
      } else if (result.success && result.case === "password-updated") {
        setSuccess(result.success);
        setMessage(returnCase.successCase);
      } else {
        setMessage(returnCase.errorCase);
      }
    } catch (err) {
      setSuccess(false);
      setMessage("An error occurred. Please try again.");
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
              htmlFor="email"
              elementType="input"
              type="email"
              name="email"
              onChange={handleOnChange}
              maxLength={80}
              describedBy="emailHelp"
              required={true}
            >
              {labels.email}
            </FormGroup>

            <FormGroup
              htmlFor="password"
              elementType="input"
              type="password"
              name="new_password"
              onChange={handleOnChange}
              minLength={8}
              maxLength={100}
              describedBy="passwordHelp"
              required={true}
            >
              {labels.newPassword}
            </FormGroup>

            <FormGroup
              htmlFor="confirm-password"
              elementType="input"
              type="password"
              name="confirm_new_password"
              onChange={handleOnChange}
              minLength={8}
              maxLength={100}
              describedBy="passwordConfirmHelp"
              required={true}
            >
              {labels.confirmNewPassword}
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
    </>
  );
}
