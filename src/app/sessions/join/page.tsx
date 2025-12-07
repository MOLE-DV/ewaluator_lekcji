"use client";
import CustomLink from "@/app/components/CustomLink";
import Input from "../../Input";
import Formbutton from "../../components/FormButton";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const sessionId = formData.get("sessionId") as string;
    router.push(`/sessions/${sessionId}`);
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className="text-purple-700 text-4xl font-bold">
        Wpisz kod sesji do której chcesz dołączyć
      </h1>
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Kod sesji..."
          minLength={5}
          maxLength={5}
          name="sessionId"
          required
          allowSpaces={false}
        />
        <Formbutton type="submit" text="Dołącz" />
        <CustomLink href="/" text="Powrót" />
      </div>
    </form>
  );
}
