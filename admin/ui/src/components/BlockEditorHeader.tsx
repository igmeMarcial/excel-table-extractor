interface BlockEditorHeaderProps {
  readonly title: string;
  style?: React.CSSProperties;
}
function BlockEditorHeader({ title, style }: Readonly<BlockEditorHeaderProps>) {
  return (
    <div
      className="flex items-center bg-emerald-600 text-white h-8 px-3"
      style={style}
    >
      <span>{title}</span>
      <span className="flex-grow"></span>
    </div>
  );
}

export default BlockEditorHeader;
