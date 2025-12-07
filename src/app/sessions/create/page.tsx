"use client";

import Button from "@/app/components/Button";
import Input from "@/app/Input";
import axios from "axios";
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
    const res = await axios.post("/api/sessions/create", { questions });
  };
  return (
    <>
      <h1 className="text-purple-700 text-4xl font-bold">Utwórz nową sesje</h1>
      <form
        className="w-1/3 p-3 border-purple-700 border-2 rounded-2xl flex flex-col text-purple-700 gap-3 min-h-3/4 box-border scroll-auto"
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
        <div className="">
          <Button text="Utwórz " className="" type="submit" />
        </div>
      </form>
    </>
  );
}
