import PageTitle from './PageTitle';

interface PageDescriptionProps {
  title?: string;
  text: string;
  img?:string;
}
function PageDescription({ text, title,img }: Readonly<PageDescriptionProps>) {
  return (
    <div className="bg-gray-200  rounded flex flex-col-reverse md:flex-row">
     
      <div className="max-w-[80ch] mx-auto flex-1">
        {title && <PageTitle title={title} />}
        <p className='text-center px-5'>{text}</p>
      </div>
       <div className='flex-1'>
        <img alt={title} src={img} className='max-w-full h-full object-cover'/>
      </div>
    </div>
  );
}

export default PageDescription;
