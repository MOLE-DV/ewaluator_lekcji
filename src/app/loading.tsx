import LoaderDotsIcon from "./components/LoaderDotsIcon";

export default function Loading() {
  return (
    <div className="w-dvw h-dvh absolute flex justify-center pt-[2%] z-50 bg-white opacity-80">
      <h1 className="text-purple-500 text-2xl md:text-4xl font-bold animate-pulse flex items-center gap-2 w-fit h-fit">
        Ładowanie
        <LoaderDotsIcon className="animate-spin h-full w-full" />
      </h1>
    </div>
  );
}
