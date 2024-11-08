import { trpc } from "@/shared/api";

export const LeaveEventButton = ({
  eventIdProp,
  onSuccess,
}: {
  eventIdProp: number;
  onSuccess?: () => void;
}) => {
  // const { mutate } = trpc.event.leave.useMutation({ onSuccess });

  function handelLeave(eventId: number) {
    // mutate({ id: eventId });
    console.log(eventId);
  }

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-red-700 text-white"
      onClick={() => handelLeave(eventIdProp)}
    >
      Покинуть
    </button>
  );
};
