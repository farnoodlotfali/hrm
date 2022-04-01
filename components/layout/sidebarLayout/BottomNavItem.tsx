import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

interface BottomNavItemProps {
  label: string;
  link: string;
  icon: any;
}
const BottomNavItem: React.FC<BottomNavItemProps> = ({ label, icon, link }) => {
  const router = useRouter();

  return (
    <Link href={link}>
      <div className="flex flex-col items-center">
        {icon}
        {router.pathname === link && (
          <span className="text-xs mt-[2px]">{label}</span>
        )}
      </div>
    </Link>
  );
};

export default memo(BottomNavItem);
