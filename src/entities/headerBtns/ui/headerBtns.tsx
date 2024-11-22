import { ButtonDefault } from "@/entities/buttonDefault";
import { useSession } from "next-auth/react";

export const HeaderBtns = () => {
  const { status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <section className="flex items-center">
          <h4 className="mr-3">Александр Сергеевич</h4>
          <ButtonDefault
            btnText={"Выйти"}
            linkPath={"/api/auth/signout"}
            className={"border-slate-200 text-slate-900 mr-3"}
          />
          <ButtonDefault
            btnText={"Создать событие"}
            linkPath={"/events/actions"}
            className={"text-slate-200 bg-green-700"}
          />
        </section>
      ) : (
        <section>
          <ButtonDefault
            btnText={"Войти"}
            linkPath={"/api/auth/signin"}
            className={"border-slate-200 text-slate-900"}
          />
        </section>
      )}
    </>
  );
};
