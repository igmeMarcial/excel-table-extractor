interface ChartProps {
  title: string;
  children: React.ReactNode;
}
const ConfigSection = ({ title, children }: ChartProps) => {
  return (
    <div className="bg-gray-100">
      <div className="bg-gray-100 px-3 py-1 font-bold">{title}</div>
      <div className="flex flex-col gap-y-3 px-3 py-2">{children}</div>
    </div>
  );
};

export default ConfigSection;
