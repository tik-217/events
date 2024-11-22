import { EventForm } from "@/features/form-event";
import { EventFormSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function EventActions() {
  const router = useRouter();

  const eventId = router.query.eventId;

  const { mutate: mutateEventCreate } = trpc.event.create.useMutation({
    onSuccess: (data) => {
      router.push(`/events/${data.id}`);
    },
  });

  const { mutate: mutateEventEdit } = trpc.event.update.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const { data: editEventData } = trpc.event.findUnique.useQuery(
    {
      id: Number(eventId),
    },
    {
      enabled: eventId !== undefined,
    }
  );

  const handleSubmit = (data: EventFormSchema) => {
    if (editEventData) {
      mutateEventEdit({ ...data, id: Number(eventId) });
    } else {
      mutateEventCreate(data);
    }
  };

  return (
    <EventForm
      onSubmit={handleSubmit}
      editEventData={editEventData ?? undefined}
    />
  );
}
