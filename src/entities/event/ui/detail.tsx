import { ButtonDefault } from "@/entities/buttonDefault";
import { RouterOutput, trpc } from "@/shared/api";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type EventDetailProps = NonNullable<RouterOutput["event"]["findUnique"]>;

export const EventDetail = ({
  title,
  description,
  date,
  participations,
}: EventDetailProps) => {
  const router = useRouter();
  const user = useSession();

  const routerId = Number(router.query.id);

  const { data: eventUnique } = trpc.event.findUnique.useQuery({
    id: Number(routerId),
  });

  if (!eventUnique) {
    return <p>Такого события нет</p>;
  }

  return (
    <div>
      <div className="px-4 sm:px-0 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Информация о событии
        </h3>
        {user.data && eventUnique.authorId === user.data.user.id && (
          <Link
            href={{
              pathname: "/events/actions",
              query: { eventId: routerId },
            }}
          >
            <ButtonDefault
              btnText={"Редактировать событие"}
              className={"bg-blue-700 text-white"}
            />
          </Link>
        )}
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Название
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Описание
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Дата проведения
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {date.toLocaleDateString()}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Участники
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {participations.map(({ user }) => user.name).join(", ")}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
