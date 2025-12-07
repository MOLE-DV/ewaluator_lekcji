export default function Chart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  if (!data) return;
  const maxValue = Math.max(...data.map((dataObj) => dataObj.value));
  console.log(maxValue);
  return (
    <div className="chart grid grid-cols-[auto_1fr] text-purple-700 w-1/2 pt-5">
      <div className="names  flex flex-col gap-3 p-2">
        {data &&
          data.map((dataObj, i) => (
            <div className="h-10" key={i}>
              {dataObj.name}
            </div>
          ))}
      </div>
      <div className="bars flex flex-col gap-3">
        {data &&
          data.map((dataObj, i) => (
            <div
              className={`h-full bg-purple-700 border-red-300 rounded-2xl`}
              key={i}
              style={{ width: `${(dataObj.value / maxValue) * 100}%` }}
            />
          ))}
      </div>
    </div>
  );
}
