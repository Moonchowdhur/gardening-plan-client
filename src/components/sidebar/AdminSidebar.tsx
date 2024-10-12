import Link from "next/link";

const AdminSidebar = () => {
  return (
    <div className="w-full rounded h-[400px] mt-[105px] bg-[#49674a] text-white p-4">
      <ul className="space-y-2">
        <li className="hover:bg-[#92a492]  border-[#92a492] border hover:text-black p-2 rounded">
          <Link href="/admindashboard">User Activity</Link>
        </li>
        <li className="hover:bg-[#92a492] border-[#92a492] border hover:text-black p-2 rounded">
          <Link href="/admindashboard/allgardening">All Gardening</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
