import LoaderDotsIcon from "./components/LoaderDotsIcon";

export default function Loading() {
  return (
    <h1 className="text-purple-700 text-4xl font-bold animate-pulse flex items-center gap-2">
      Ładowanie
      <LoaderDotsIcon className="animate-spin h-full w-full" />
    </h1>
  );
}
