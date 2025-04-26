import { MoneyBox } from "@/assets";

const WelcomeBanner = ({ user }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={user?.profilePicture}
        alt={user?.name || "No User"}
        className="max-w-24 min-w-24 rounded-full bg-red-400"
      />
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Welcome back, {user?.name || "No User"} 👋
        </h2>
        <p className="text-gray-600 text-sm">
          Here's to another productive day! Remember, your goals aren't going to
          chase themselves — let’s make something amazing happen today.
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
