"use client";
import CustomLink from "@/app/components/CustomLink";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import axios from "axios";
import { SessionType } from "@/app/api/sessions/[sessionCode]/route";
import SmileIcon from "@/app/components/Smile";
import ConfusedIcon from "@/app/components/Confused";
import SadIcon from "@/app/components/Sad";
import QRCode from "react-qr-code";
import { useLoadingScreen } from "@/app/contexts/LoadingScreenContext";

export default function SessionLobby() {
  const pagePath = usePathname();
  const { setLoading } = useLoadingScreen();
  const [isHost, setIsHost] = useState(false);
  const [sessionData, setSessionData] = useState<SessionType | null>(null);
  const [question, setQuestion] = useState({ questionId: 0, text: "" });
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [numberOfAnswers, setNumberOfAnswers] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const checkSession = async () => {
      const sessionCode = pagePath.split("/").pop();
      setLoading(true);
      const res = await axios.get(`/api/sessions/${sessionCode}`);
      if (res.status !== 200 || !res) {
        alert("Wystąpił błąd podczas łączenia z sesją");
        setLoading(false);
        router.push("/sessions/join");
      }
      const data = await res.data;
      if (!data.session) {
        alert("Nie znaleziono sesji o podanym kodzie.");
        setLoading(false);
        router.push("/sessions/join");
      } else {
        setQuestion({ questionId: 0, text: data.session.questions[0] || "" });
        setSessionData(data.session);
        setIsHost(data.isHost);
      }
      setLoading(false);
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
    setUserAnswers((prev) => [...prev, answer]);

    if (question.questionId + 1 >= sessionData.questions.length) {
      try {
        setLoading(true);
        await axios.post(`/api/addAnswers`, {
          sessionId: sessionData._id,
          answers: [...userAnswers, answer],
        });
        setLoading(false);
      } catch (err) {
        alert("Błąd podczas wysyłania odpowiedzi.");
        console.error(err);
        return;
      }
      router.push(`./${sessionData.sessionCode}/results`);
      return;
    }

    setQuestion({
      questionId: question.questionId + 1,
      text: sessionData?.questions[question.questionId + 1] || "",
    });
  };

  const updateNumberOfAnswers = async () => {
    if (!sessionData || !sessionData._id) return;
    setLoading(true);
    const res = await axios.get(`/api/getAllAnswers/${sessionData._id}`);
    setLoading(false);
    if (!res) return;
    setNumberOfAnswers(res.data.answers.length);
  };

  const startSession = async () => {
    if (!sessionData || !sessionData.sessionCode) return;
    setLoading(true);
    const res = await axios.post(
      `/api/sessions/${sessionData.sessionCode}/start`
    );
    setLoading(false);
    if (!res || res.status !== 201) return;
    window.location.reload();
  };

  const endSession = async () => {
    if (!sessionData || !sessionData.sessionCode) return;
    setLoading(true);
    const res = await axios.post(
      `/api/sessions/${sessionData.sessionCode}/end`
    );
    setLoading(false);
    if (!res || res.status !== 201) return;
    router.push(`/sessions/${sessionData.sessionCode}/results`);
  };

  if (isHost) {
    return (
      <>
        {sessionData && !sessionData.started && (
          <>
            <h2 className="text-purple-500 text-2xl md:text-3xl">
              Kod twojej sesji to
            </h2>
            <h1 className="text-purple-500 text-2xl md:text-4xl font-bold">
              {sessionData?.sessionCode}
            </h1>
            <QRCode
              value={document.URL}
              fgColor="oklch(62.7% 0.265 303.9)"
              className="mt-3 rounded-2xl"
            />
          </>
        )}
        {sessionData && sessionData.started && (
          <>
            <h1 className="text-purple-500 text-2xl md:text-3xl font-bold">
              Sesja trwa...
            </h1>
            <h2 className="text-purple-500 text-2xl md:text-3xl font-bold my-3">
              Aktualna liczba odpowiedzi: {numberOfAnswers}
            </h2>
          </>
        )}

        <div className="flex flex-row gap-3 my-5">
          {sessionData && !sessionData.started && (
            <Button text="Rozpocznij sesje" onClick={startSession} />
          )}
          {sessionData && sessionData.started && (
            <Button
              text="Odśwież liczbe odpowiedzi"
              onClick={updateNumberOfAnswers}
            />
          )}
          <Button text="Zakończ sesje" onClick={endSession} />
        </div>
      </>
    );
  } else if (
    sessionData &&
    sessionData.started &&
    !sessionData.ended &&
    question.questionId <= sessionData.questions.length - 1
  ) {
    return (
      <>
        <h1 className="text-purple-500 text-3xl md:text-4xl font-bold">
          {question.text}
        </h1>
        <div className="flex w-full sm:w-fit justify-between my-10 sm:gap-10">
          <Button
            icon={<SmileIcon className="w-full h-full" />}
            className="bg-green-500 w-15 aspect-square rounded-full text-white cursor-pointer hover:scale-110 transition-transform"
            disableDefaultStyling
            onClick={() => questionAnswerButtonClickHanlder("yes")}
          />
          <Button
            icon={<ConfusedIcon className="w-full h-full" />}
            className="bg-orange-500 w-15 aspect-square rounded-full text-white cursor-pointer hover:scale-110 transition-transform"
            disableDefaultStyling
            onClick={() => questionAnswerButtonClickHanlder("maybe")}
          />
          <Button
            icon={<SadIcon className="w-full h-full" />}
            className="bg-red-500 w-15 aspect-square rounded-full text-white cursor-pointer hover:scale-110 transition-transform"
            disableDefaultStyling
            onClick={() => questionAnswerButtonClickHanlder("no")}
          />
        </div>
      </>
    );
  } else if (sessionData && !sessionData.ended) {
    return (
      <>
        <h1 className="text-purple-500 text-2xl md:text-4xl font-bold">
          Oczekiwanie na rozpoczęcie sesji...
        </h1>
        <div className="flex gap-3 my-5">
          <Button onClick={() => window.location.reload()} text="Odśwież" />
          <CustomLink href="/" text="Powrót" />
        </div>
      </>
    );
  }
}
