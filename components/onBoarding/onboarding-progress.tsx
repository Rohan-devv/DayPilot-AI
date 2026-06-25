type Props = {
  current: number;
  total: number;
};

export function OnboardingProgress({
  current,
  total,
}: Props) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-[#777] text-sm">
          Step {current} of {total}
        </span>

        <span className="text-[#777] text-sm">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-2 bg-[#111] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#FF6B00]"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}