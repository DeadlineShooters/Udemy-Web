import MainNav from "./MainNav";

export default function Sidebar() {
  return (
    <aside className=" py-8 pr-6  grid-rows-[auto,1fr] flex flex-col gap-8">
      <MainNav />
    </aside>
  );
}
