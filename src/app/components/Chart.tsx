import { ReactElement } from "react";

export default function Chart({
  data,
  className,
}: {
  data: { icon: ReactElement; value: number }[];
  className?: string;
}) {
  if (!data) return;
  const maxValue = Math.max(...data.map((dataObj) => dataObj.value));
  console.log(maxValue);
  return (
    <div
      className={`chart grid grid-cols-[auto_1fr] text-purple-500 w-1/2 pt-5 ${className}`}
    >
      <div className="names  flex flex-col gap-3 p-2">
        {data &&
          data.map((dataObj, i) => (
            <div className="h-10" key={i}>
              {dataObj.icon}
            </div>
          ))}
      </div>
      <div className="bars flex flex-col gap-3">
        {data &&
          data.map((dataObj, i) => (
            <div
              className={`h-full bg-purple-500 rounded-2xl animate-[fill_1s_ease-out_forwards]`}
              key={i}
              style={{ width: `${(dataObj.value / maxValue) * 100}%` }}
            />
          ))}
      </div>
    </div>
  );
}
