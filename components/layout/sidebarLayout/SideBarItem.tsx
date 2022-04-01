import Link from "next/link";
import { useRouter } from "next/router";
import { Clock } from "react-feather";

interface SideBarItemProps {
  icon: any;
  label: string;
  link: string;
  disable?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  label,
  link,
  icon,
  disable = false,
}) => {
  const router = useRouter();
  if (disable) {
    return (
      <div className="flex justify-end overflow-hidden  cursor-not-allowed mt-2 py-2 border-r-4 bg-blue-50">
        <div className="whitespace-nowrap mr-3 self-center">{label}</div>
        <div className="">{icon}</div>
      </div>
    );
  }
  return (
    <Link href={link}>
      <div
        className={`flex justify-end overflow-hidden hover:bg-gray-100 cursor-pointer mt-2 py-2 border-r-4 ${
          router.pathname === link
            ? "border-firstColor-900 bg-gray-200"
            : "bg-blue-50"
        } `}
      >
        <div className="whitespace-nowrap mr-3 self-center">{label}</div>
        <div className="">{icon}</div>
      </div>
    </Link>
  );
};

export default SideBarItem;
