type DataCardProps = {
  title: string;
  data: number;
};

export function DataCard({ title, data }: DataCardProps) {
  return (
    <div className="p-2 border-2">
      <p className="text-xl">{title}</p>
      <p className="text-gray-600">{data}</p>
    </div>
  );
}
