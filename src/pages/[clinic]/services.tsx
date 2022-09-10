import { NextPage } from "next";
import PageWrap from "../../components/PageWrap";
import useHistoryStore from "../../hooks/useHistoryStore";
import { trpc } from "../../utils/trpc";

const Services: NextPage = (props) => {
  const clinicId = useHistoryStore((state) => state.clinicId);
  const services = trpc.useQuery([
    "services.getServicesInClinic",
    { clinicId },
  ]);

  return (
    <PageWrap
      title="Tjenester"
      form="servicesForm"
      buttonTitle="Legg til tjeneste"
      formTitle="Legg til tjeneste"
    >
      <div>
        {services.data?.map((service) => (
          <div key={service.id}>{service.name}</div>
        ))}
      </div>
    </PageWrap>
  );
};

export default Services;
