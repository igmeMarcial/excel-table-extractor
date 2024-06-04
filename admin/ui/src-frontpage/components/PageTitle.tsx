interface PageTitleProps {
  title: string;
}
function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-xl px-5 md:px-0 md:text-3xl my-5 text-center">{title}</h1>;
}

export default PageTitle;
