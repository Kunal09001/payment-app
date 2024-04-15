export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="bg-white shadow-md rounded ml-2 p-4">
      <div className="font-bold text-xl border-b border-gray-500 pb-2 ">
        {title}
      </div>
      <div>
        {children}
      </div>
    </div> 
  )
}
