"use client";
import { AnswerType } from "@/app/api/getAllAnswers/[_sessionId]/route";
import { SessionType } from "@/app/api/sessions/[sessionCode]/route";
import Button from "@/app/components/Button";
import Chart from "@/app/components/Chart";
import ConfusedIcon from "@/app/components/Confused";
import CustomLink from "@/app/components/CustomLink";
import SadIcon from "@/app/components/Sad";
import SmileIcon from "@/app/components/Smile";
import { useLoadingScreen } from "@/app/contexts/LoadingScreenContext";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, Suspense, useEffect, useState } from "react";

export default function SessionResults() {
  const [countedAnswers, setCountedAnswers] = useState<
    { icon: ReactElement; value: number }[]
  >([]);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState<string>("");
  const pathname = usePathname();
  const sessionCode = pathname.split("/").at(-2);
  const [sessionData, setSessionData] = useState<SessionType>();
  const router = useRouter();
  const { setLoading } = useLoadingScreen();
  useEffect(() => {
    if (!sessionCode) return;

    const checkSession = async () => {
      setLoading(true);
      const res = await axios.get(`/api/sessions/${sessionCode}`);
      const data = await res.data;
      setLoading(false);

      if (!data.session || res.status !== 200) {
        alert("Nie znaleziono sesji o podanym kodzie.");
        router.push("/");
      }
      if (data.session.ended && data.session._id) {
        const fetchedAnswers = await getAnswers(data.session._id);
        if (!fetchedAnswers) return;
        setAnswers(fetchedAnswers);
        setQuestion(data.session.questions[0]);
        countAnswers(fetchedAnswers, 0);
      }
      setSessionData(data.session);
    };

    checkSession();
  }, []);

  const getAnswers = async (_sessionId: string) =>
    (await axios.get(`/api/getAllAnswers/${_sessionId}`)).data.answers;

  const countAnswers = (answers: AnswerType[], questionIndex: number) => {
    if (!answers || answers.length === 0) return;
    const order = [
      <SmileIcon className="w-full h-full bg-green-500 text-white rounded-full" />,
      <ConfusedIcon className="w-full h-full bg-orange-500 text-white rounded-full" />,
      <SadIcon className="w-full h-full bg-red-500 text-white rounded-full" />,
    ];
    const answerValues = answers
      .filter((a: AnswerType) => a.questionIndex === questionIndex)
      .map((answerObject: AnswerType) => answerObject.answer) as string[];
    const answersCounted = [...new Set(answerValues)].map((answer: string) => {
      const num = answerValues.filter((a: string) => a === answer).length;
      const icon =
        answer === "yes" ? (
          <SmileIcon className="w-full h-full bg-green-500 text-white rounded-full" />
        ) : answer === "maybe" ? (
          <ConfusedIcon className="w-full h-full bg-orange-500 text-white rounded-full" />
        ) : (
          <SadIcon className="w-full h-full bg-red-500 text-white rounded-full" />
        );
      return { icon, value: num };
    });
    setCountedAnswers(
      answersCounted.sort(
        (a, b) => order.indexOf(a.icon) - order.indexOf(b.icon)
      )
    );
  };

  const nextQuestion = () => {
    const questionIndex = sessionData?.questions.indexOf(question) || 0;
    if (!sessionData || questionIndex + 1 >= sessionData.questions.length)
      return;
    setQuestion(sessionData.questions[questionIndex + 1]);
    countAnswers(answers, questionIndex + 1);
  };

  const prevQuestion = () => {
    const questionIndex = sessionData?.questions.indexOf(question) || 0;
    if (!sessionData || questionIndex - 1 < 0) return;
    setQuestion(sessionData.questions[questionIndex - 1]);
    countAnswers(answers, questionIndex - 1);
  };

  if (sessionData && sessionData.ended) {
    return (
      <div className="flex flex-col gap-3 w-full md:w-1/2 items-center">
        <nav className="text-purple-500 text-2xl md:text-4xl text-center flex gap-5 items-center">
          {sessionData && sessionData.questions.indexOf(question) > 0 && (
            <Button text="<" className="h-fit" onClick={prevQuestion} />
          )}
          <div>
            <h1 className="font-bold">
              Pytanie {sessionData.questions.indexOf(question) + 1}/
              {sessionData.questions.length}
            </h1>
            <h2 className="text-2xl md:text-3xl">{question}</h2>
          </div>
          {sessionData &&
            sessionData.questions.indexOf(question) + 1 <
              sessionData.questions.length && (
              <Button text=">" className="h-fit" onClick={nextQuestion} />
            )}
        </nav>
        <Chart data={countedAnswers} className="w-full" />
        <CustomLink href="/" text="Strona głowna" className="w-fit" />
      </div>
    );
  } else {
    return (
      <>
        <h1 className="text-purple-500 text-2xl md:text-4xl font-bold">
          Oczekiwanie na zakończenie sesji...
        </h1>
        <div id="buttons-container" className="flex my-5 gap-8">
          <Button onClick={() => window.location.reload()} text="Odśwież" />
          <CustomLink href="/" text="Strona główna" />
        </div>
      </>
    );
  }
}
