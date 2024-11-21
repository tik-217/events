import Link from "next/link";

interface IBtnDefaultProps {
  btnText: string;
  linkPath?: string;
  className: string;
}

export const ButtonDefault = ({
  btnText,
  linkPath,
  className,
}: IBtnDefaultProps) => {
  const buttonStyles = `h-10 px-6 font-semibold rounded-md border ${className} align-middle leading-10`;

  return (
    <div className="flex space-x-4 text-sm font-medium">
      <div className="flex-auto flex space-x-4">
        {linkPath ? (
          <Link href={linkPath} className={buttonStyles}>
            <button>{btnText}</button>
          </Link>
        ) : (
          <button className={buttonStyles}>{btnText}</button>
        )}
      </div>
    </div>
  );
};
