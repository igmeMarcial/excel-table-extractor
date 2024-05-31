import PageTitle from './PageTitle';

interface PageDescriptionProps {
  title?: string;
  text: string;
}
function PageDescription({ text, title }: Readonly<PageDescriptionProps>) {
  return (
    <div className="bg-gray-200 py-4 rounded">
      <div className="max-w-[80ch] mx-auto">
        {title && <PageTitle title={title} />}
        <p>{text}</p>
      </div>
    </div>
  );
}

export default PageDescription;
