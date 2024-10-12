export default function UserProfileAchievements() {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-xl font-semibold">Achievements:</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 h-48 rounded-lg"></div>
        <div className="bg-gray-100 h-48 rounded-lg"></div>
        <div className="bg-gray-100 h-48 rounded-lg"></div>
      </div>
    </div>
  );
}
