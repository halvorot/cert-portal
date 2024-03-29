import Image from "next/image";
import { getWouldTakeAgainPercentage } from "@/utils/mathUtils";
import { BsChatRightQuote, BsArrowRepeat } from "react-icons/bs";
import { motion } from "framer-motion";

interface Certification {
  id: number;
  name: string;
  exam_code: string;
  badge_image_url?: string;
  ratings: Rating[];
}

interface Rating {
  id: number;
  would_take_again: boolean;
}

export default function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 0.5rem 1rem rgb(10, 10, 10, 0.5)" }}
      className="flex items-center rounded-md bg-light-accent/20 p-0.5"
    >
      <a
        href={"/certifications/" + certification.exam_code}
        className="w-full rounded-lg px-6 pb-2 pt-6 leading-6 text-light"
      >
        <span className="flex items-center">
          {certification.badge_image_url && (
            <Image
              src={certification.badge_image_url}
              alt=""
              width={600}
              height={600}
              className="mr-2 object-cover aspect-square w-20 rounded-full"
            />
          )}
          <div className="text-left">
            <h3 className="text-md text-light-accent">
              {certification.exam_code}
            </h3>
            <h2 className="line-clamp-2 text-lg font-semibold">
              {certification.name}
            </h2>
          </div>
        </span>
        <div className="mt-2 flex items-center justify-end gap-5 text-light-accent">
          <div>
            {certification.ratings && certification.ratings.length > 0 && (
              <div className="flex items-center">
                <BsArrowRepeat className="mr-1 w-4" />
                {getWouldTakeAgainPercentage(certification.ratings)?.toFixed(
                  0,
                ) + "%"}
              </div>
            )}
          </div>
          <div className="flex items-center">
            <BsChatRightQuote className="mr-2 w-4" />
            {certification.ratings?.length ?? 0}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
