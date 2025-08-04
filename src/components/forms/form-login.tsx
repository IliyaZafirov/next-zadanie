"use client";

import { useEffect, useRef, useState } from "react";
import FormGroup from "./form-group";
import Link from "next/link";
import RoundedButton from "../ui/btn-rounded";
import Message from "../message";
import { useRouter } from "next/navigation";
import Spinner from "../spinner";

type Labels = {
  username: string;
  password: string;
};

type Links = {
  register: string;
  back: string;
};

type ReturnCase = {
  emptyFieldsCase: string;
  incorrectCase: string;
  successCase: string;
  errorCase: string;
  submit: string;
};
export default function LoginForm({
  labels,
  links,
  returnCase,
}: {
  labels: Labels;
  links: Links;
  returnCase: ReturnCase;
}) {
  const messageRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    success && window.location.replace("/dashboard");
  }, [success, router]);

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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      if (!result.success && result.case === "empty-fields") {
        setMessage(returnCase.emptyFieldsCase);
      } else if (!result.success && result.case === "incorrect") {
        setMessage(returnCase.incorrectCase);
      } else if (result.success && result.case === "loggedIn") {
        setSuccess(result.success);
        setMessage(returnCase.successCase);
      } else {
        setMessage(returnCase.errorCase);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="md:border md:border-white/20">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full justify-center items-center px-14 mt-16 text-white/50"
        >
          <FormGroup
            htmlFor="username"
            elementType="input"
            type="username"
            name="username"
            onChange={handleOnChange}
            maxLength={40}
            required={true}
          >
            {labels.username}
          </FormGroup>

          <FormGroup
            htmlFor="password"
            elementType="input"
            type="password"
            name="password"
            onChange={handleOnChange}
            minLength={8}
            maxLength={40}
            required={true}
          >
            {labels.password}
          </FormGroup>
          <div className="flex flex-row justify-center items-center w-full pb-24">
            <div className="pb-4">
              {!success && (
                <RoundedButton type="submit" disabled={success && isSubmit}>
                  {isLoading ? <Spinner /> : returnCase.submit}
                </RoundedButton>
              )}
              {/* <Link href="/forgot" className="text-xs text-white/50 pl-5">
              Forgot Password?
            </Link> */}
              <div className="absolute ml-auto mr-auto left-0 right-0 text-center pt-4">
                {!success && (
                  <Message
                    ref={messageRef}
                    success={success}
                    message={message}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
      <section className="flex flex-row gap-x-6 mt-4 text-sm text-white/60 mb-16">
        <Link href="/forgot" className="hover:text-white/90">
          {links.register}
        </Link>
        <Link href="/" className="hover:text-white/90">
          {links.back}
        </Link>
      </section>
    </>
  );
}
