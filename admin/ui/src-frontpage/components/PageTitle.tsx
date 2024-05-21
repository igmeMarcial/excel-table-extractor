interface PageTitleProps {
  title: string;
}
function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-3xl">{title}</h1>;
}

export default PageTitle;
