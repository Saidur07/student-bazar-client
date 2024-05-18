import Link from "next/link";
import React from "react";

const SectionContainer = ({
  title,
  line = false,
  children,
  className,
  sideBtn = { url: "", text: "" },
}) => {
  return (
    <div className={className}>
      {title && (
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-2xl font-bangla">{title}</h4>
          {sideBtn?.url && (
            <Link href={sideBtn.url}>
              <span className="font-bangla underline cursor-pointer">
                {sideBtn.text}
              </span>
            </Link>
          )}
        </div>
      )}
      {line && <hr className="my-2 border-slate-200" />}
      <div className="mt-3">{children}</div>
    </div>
  );
};

export default SectionContainer;
