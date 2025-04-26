import { CircleHelp } from "lucide-react";

const AuthBottomText = () => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-between max-md:gap-4">
      <p className="text-sm text-center">
        Copyright {new Date().getFullYear()} Piggy 365. All rights Reserved
      </p>
      <span className="flex items-center text-sm gap-2">
        <CircleHelp />
        <a href="#">Need help?</a>
      </span>
    </div>
  );
};

export default AuthBottomText;
