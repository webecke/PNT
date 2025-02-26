"use client";

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface ProfileIconProps {
  src?: string;
  alt: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center items-center w-24 h-24 rounded-full overflow-hidden bg-gray-200">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={96}
          height={96}
          className="object-cover"
        />
      ) : (
        <FaUserCircle className="text-gray-500 w-24 h-24" />
      )}
    </div>
  );
};

export default ProfileIcon;
