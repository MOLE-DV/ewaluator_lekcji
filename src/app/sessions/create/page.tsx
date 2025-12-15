"use client";

import Button from "@/app/components/Button";
import CustomLink from "@/app/components/CustomLink";
import { useLoadingScreen } from "@/app/contexts/LoadingScreenContext";
import Input from "@/app/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const QuestionCreatorBox = ({
  index,
  last,
  onAddQuestionButtonClick,
  onRemoveQuestionButtonClick,
  onChange,
  removable = true,
}: {
  index: number;
  last?: boolean;
  onAddQuestionButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveQuestionButtonClick?: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removable?: boolean;
}) => (
  <div className="questionBox grid grid-cols-[auto_1fr_auto] items-center gap-3">
    <h2 className="text-2xl">
      {index}
      {"}"}
    </h2>
    <Input
      type="text"
      className="w-full"
      placeholder="pytanie..."
      onChange={onChange}
      required
    />
    {removable && <Button text="Usuń" onClick={onRemoveQuestionButtonClick} />}
    {last && (
      <Button
        text="Dodaj pytanie"
        className="col-2 "
        onClick={onAddQuestionButtonClick}
      />
    )}
  </div>
);

export default function CreateSession() {
  const [questions, setQuestions] = useState<string[]>([""]);
  const router = useRouter();
  const { setLoading } = useLoadingScreen();
  const addQuestionButtonClickHandler = () => {
    setQuestions((prev) => [...prev, ""]);
  };
  const removeQuestionButtonClickHanlder = (index: number) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => [...prev.filter((_, i) => i !== index)]);
    const questionBoxesInputs = Array.from(
      document.querySelectorAll(".questionBox")
    )
      .filter((_, i) => i !== questions.length - 1)
      .map((questionBox) => questionBox.querySelector("input"));
    questionBoxesInputs.forEach(
      (questionBoxInput, i) =>
        ((questionBoxInput as HTMLInputElement).value = questions.filter(
          (_, i) => i !== index
        )[i])
    );
  };
  const questionBoxValueChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputElement = e.currentTarget;
    const modifiedQuestionsState = questions.map((question, i) =>
      i == index ? inputElement.value : question
    );
    setQuestions(modifiedQuestionsState);
  };

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post("/api/sessions/create", { questions });
    setLoading(false);
    if (res) {
      const sessionData = res.data.newSession;
      router.push(`/sessions/${sessionData.sessionCode}`);
    }
  };
  return (
    <>
      <h1 className="text-purple-500 text-2xl md:text-4xl font-bold">
        Utwórz nową sesje
      </h1>
      <form
        className="w-full md:w-1/2 h-fit my-3 p-3  flex flex-col text-purple-500 gap-3  box-border scroll-auto border-purple-500 md:border-2 rounded-2xl"
        onSubmit={onFormSubmit}
      >
        {questions.map((question, i) => (
          <QuestionCreatorBox
            index={i + 1}
            last={i === questions.length - 1}
            onAddQuestionButtonClick={addQuestionButtonClickHandler}
            onRemoveQuestionButtonClick={(
              e: React.MouseEvent<HTMLButtonElement>
            ) => removeQuestionButtonClickHanlder(i)}
            key={i}
            removable={i !== 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              questionBoxValueChangeHandler(e, i)
            }
          />
        ))}
        <div className="flex justify-between p-3">
          <Button text="Utwórz " className="" type="submit" />
          <CustomLink text="Powrót " className="" href="/" />
        </div>
      </form>
    </>
  );
}
