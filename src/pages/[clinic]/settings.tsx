import { NextPage } from "next";
import ClinicForm from "../../components/Forms/ClinicForm";
import PageWrap from "../../components/PageWrap";
import useHistoryStore from "../../hooks/useHistoryStore";

const Settings: NextPage = (props) => {
  const clinicId = useHistoryStore((state) => state.clinicId);
  return (
    <PageWrap title="Innstillinger">
      <ClinicForm update clinicId={clinicId} />
    </PageWrap>
  );
};

export default Settings;
