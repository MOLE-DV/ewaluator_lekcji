"use client";
import CustomLink from "@/app/components/CustomLink";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import axios from "axios";
import { SessionType } from "@/app/api/sessions/[sessionCode]/route";

export default function SessionLobby() {
  const pagePath = usePathname();
  const [isHost, setIsHost] = useState(false);
  const [sessionData, setSessionData] = useState<SessionType | null>(null);
  const [question, setQuestion] = useState({ questionId: 0, text: "" });
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const sessionCode = pagePath.split("/").pop();
      const res = await axios.get(`/api/sessions/${sessionCode}`);
      if (res.status !== 200 || !res) {
        alert("Wystąpił błąd podczas łączenia z sesją");
        router.push("/sessions/join");
      }
      const data = await res.data;
      if (!data.session) {
        alert("Nie znaleziono sesji o podanym kodzie.");
        router.push("/sessions/join");
      } else {
        setQuestion({ questionId: 0, text: data.session.questions[0] || "" });
        setSessionData(data.session);
        setIsHost(data.isHost);
      }
    };
    checkSession();
  }, [router, pagePath]);

  useEffect(() => {
    if (sessionData?.ended) {
      router.push(`${pagePath}/results`);
    }
  }, [sessionData?.ended, pagePath, router]);

  const questionAnswerButtonClickHanlder = async (
    answer: "yes" | "no" | "maybe"
  ) => {
    if (!sessionData) return;

    try {
      await axios.post(`/api/addAnswer`, {
        sessionId: sessionData._id,
        questionIndex: question.questionId,
        answer: answer,
      });
    } catch (err) {
      alert("Błąd podczas wysyłania odpowiedzi.");
      console.error(err);
      return;
    }

    if (question.questionId + 1 >= sessionData.questions.length) {
      router.push(`./${sessionData.sessionCode}/results`);
      return;
    }

    setQuestion({
      questionId: question.questionId + 1,
      text: sessionData?.questions[question.questionId + 1] || "",
    });
  };

  if (isHost) {
    return (
      <h1 className="text-purple-700 text-4xl font-bold">Jesteś hostem</h1>
    );
  } else if (
    sessionData &&
    sessionData.started &&
    !sessionData.ended &&
    question.questionId <= sessionData.questions.length - 1
  ) {
    return (
      <>
        <h1 className="text-purple-700 text-4xl font-bold">{question.text}</h1>
        <div className="flex gap-3 my-5">
          <Button
            text="Tak"
            onClick={() => questionAnswerButtonClickHanlder("yes")}
          />
          <Button
            text="Może"
            onClick={() => questionAnswerButtonClickHanlder("maybe")}
          />
          <Button
            text="Nie"
            onClick={() => questionAnswerButtonClickHanlder("no")}
          />
        </div>
      </>
    );
  } else if (sessionData && !sessionData.ended) {
    return (
      <>
        <h1 className="text-purple-700 text-4xl font-bold">
          Oczekiwanie na rozpoczęcie sesji...
        </h1>
        <div className="flex gap-3 my-5">
          <Button onClick={() => window.location.reload()} text="Odświerz" />
          <CustomLink href="/" text="Powrót" />
        </div>
      </>
    );
  }
}
