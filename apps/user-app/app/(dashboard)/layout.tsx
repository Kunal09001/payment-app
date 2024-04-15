import SideBar from "../../components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <div className="border-r border-gray-800 flex-1">
        <SideBar />
      </div>
      <div className="flex-[3]">
        {children}
      </div>
    </div>
  );
}
