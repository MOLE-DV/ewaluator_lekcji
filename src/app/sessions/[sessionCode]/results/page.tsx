"use client";
import { AnswerType } from "@/app/api/getAllAnswers/[_sessionId]/route";
import { SessionType } from "@/app/api/sessions/[sessionCode]/route";
import Button from "@/app/components/Button";
import Chart from "@/app/components/Chart";
import CustomLink from "@/app/components/CustomLink";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function SessionResults() {
  const [countedAnswers, setCountedAnswers] = useState<
    { name: string; value: number }[]
  >([]);
  const pathname = usePathname();
  const sessionCode = pathname.split("/").at(-2);
  const [sessionData, setSessionData] = useState<SessionType>();
  const router = useRouter();
  useEffect(() => {
    if (!sessionCode) return;

    const checkSession = async () => {
      const res = await axios.get(`/api/sessions/${sessionCode}`);
      const data = await res.data;

      if (!data.session || res.status !== 200) {
        alert("Nie znaleziono sesji o podanym kodzie.");
        router.push("/");
      }
      if (data.session.ended && data.session._id) {
        countAnswers(data.session._id);
      }
      setSessionData(data.session);
    };

    checkSession();
  }, []);

  const getAnswers = async (_sessionId: string) =>
    (await axios.get(`/api/getAllAnswers/${_sessionId}`)).data.answers;

  const countAnswers = async (_sessionId: string) => {
    const answers = await getAnswers(_sessionId);
    if (!answers || answers.length === 0) return;

    const answerValues = answers.map(
      (answerObject: AnswerType) => answerObject.answer
    ) as string[];
    const answersCounted = [...new Set(answerValues)].map((answer: string) => {
      const num = answerValues.filter((a: string) => a === answer).length;
      return { name: answer, value: num };
    });
    setCountedAnswers(answersCounted.reverse());
  };

  if (sessionData && sessionData.ended) {
    return (
      <>
        <h1 className="text-purple-700 text-4xl font-bold">Wyniki</h1>
        <Chart data={countedAnswers} />
        <CustomLink href="/" text="Powrót do strony głownej" className="my-5" />
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-purple-700 text-4xl font-bold">
          Oczekiwanie na zakończenie sesji...
        </h1>
        <div id="buttons-container" className="flex my-5 gap-8">
          <Button onClick={() => window.location.reload()} text="Odświerz" />
          <CustomLink href="/" text="Powrót do strony głownej" />
        </div>
      </>
    );
  }
}
