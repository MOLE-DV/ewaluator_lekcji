import CustomLink from "./components/CustomLink";

export default function Home() {
  return (
    <>
      <h1 className="text-purple-700 text-4xl font-bold">
        Witaj w ewaluatorze lekcji
      </h1>
      <div id="buttons-container" className="flex my-5 gap-8">
        <CustomLink href="/sessions/join" text="Dołącz do sesji" />
        <CustomLink href="/sessions/create" text="Utwórz sesje" />
      </div>
    </>
  );
}
