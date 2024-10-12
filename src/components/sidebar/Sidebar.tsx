import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-full rounded h-[400px] mt-16 bg-[#49674a] text-white p-4">
      <ul className="space-y-2">
        <li className="hover:bg-[#92a492]  border-[#92a492] border hover:text-black p-2 rounded">
          <Link href="/userdashboard">Gardening</Link>
        </li>
        <li className="hover:bg-[#92a492] border-[#92a492] border hover:text-black p-2 rounded">
          <Link href="/userdashboard/favourite">Favorite Gardening</Link>
        </li>
        <li className="hover:bg-[#92a492] border-[#92a492] border hover:text-black p-2 rounded">
          <Link href="/userdashboard/follow">Profile </Link>
        </li>
        <li className="hover:bg-[#92a492] border-[#92a492] border hover:text-black p-2 rounded">
          <Link href="/userdashboard/update-profile">Update Profile </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
