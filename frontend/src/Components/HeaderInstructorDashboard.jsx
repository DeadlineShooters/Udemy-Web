import UserNav from "./UserNav";

export default function HeaderInstructorDashboard() {
  return (
    <div className="flex flex-row items-center justify-end mt-5 mr-12">
      <a href="/" className="hover:text-purple-600">
        Student
      </a>
      <UserNav />
    </div>
  );
}
