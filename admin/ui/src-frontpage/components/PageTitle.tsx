interface PageTitleProps {
  title: string;
}
function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-3xl my-5">{title}</h1>;
}

export default PageTitle;
