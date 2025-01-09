import { Tooltip } from "@nextui-org/react";

export default function AchievementTooltip({
  isAchieved,
  children,
}: {
  isAchieved: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip
      showArrow={true}
      color="primary"
      content={
        isAchieved
          ? "Achievement completed! 🎉"
          : "This achievement is not completed yet..."
      }
    >
      {children}
    </Tooltip>
  );
}
