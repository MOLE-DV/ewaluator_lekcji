import CustomLink from "../components/CustomLink";
export default function Abouy() {
  return (
    <div className="w-full md:w-fit">
      <h1 className="text-purple-500 text-2xl md:text-4xl font-bold">
        Ewaluator lekcji stworzony przez Maksymiliana Olejnika &copy;
      </h1>
      <h2 className="text-purple-500 text-2xl md:text-3xl break-normal">
        Ikony: Boxicons v3.0.6{" "}
        <a
          href="https://boxicons.com"
          target="_blank"
          className="italic underline break-all"
        >
          https://boxicons.com
        </a>{" "}
        | License
        <a
          href="https://docs.boxicons.com/free"
          target="_blank"
          className="italic underline break-all"
        >
          https://docs.boxicons.com/free
        </a>
        <br />
        Czcionka Swansea:{" "}
        <a
          href="https://www.fontspace.com/swansea-font-f5873"
          className="italic underline break-all"
        >
          https://www.fontspace.com/swansea-font-f5873
        </a>
      </h2>
      <div id="buttons-container" className="flex my-5 gap-8">
        <CustomLink href="/" text="Strona główna" />
      </div>
    </div>
  );
}
