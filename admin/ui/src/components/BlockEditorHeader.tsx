interface BlockEditorHeaderProps {
  readonly title: string;
}
function BlockEditorHeader({ title }: BlockEditorHeaderProps) {
  return (
    <div className="flex items-center bg-emerald-600 text-white h-9 px-4">
      <span>{title}</span>
      <span className="flex-grow"></span>
    </div>
  );
}

export default BlockEditorHeader;
