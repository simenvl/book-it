import { NextPage } from "next";
import { useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";
import {
  SettingsKeys,
  SettingsView,
} from "../../components/SideBarMenu/SideBarMenu";
import useHistoryStore from "../../hooks/useHistoryStore";
import useModal from "../../hooks/useModal/useModal";
import { trpc } from "../../utils/trpc";
import Resources from "./resources";
import ModalWithContent from "../../components/ModalWithContent/ModalWithContent";
import Link from "next/link";
import ClinicForm from "../../components/Forms/ClinicForm";

const getSettingsView = (view: SettingsKeys) => {
  const settingsView: SettingsView = {
    resources: <Resources />,
  };

  return settingsView[view];
};

const Clinic: NextPage = (props) => {
  const [settingsView, setSettingsView] = useState<SettingsKeys>("resources");
  const [modalOpen, setModalOpen, toggleModal] = useModal();

  const { clinicId, setClinicId } = useHistoryStore((state) => ({
    clinicId: state.clinicId,
    setClinicId: state.setClinicId,
  }));
  const clinic = trpc.useQuery(["clinics.getClinic", { id: clinicId }]);
  const clinics = trpc.useQuery(["clinics.getAllClinics"]);

  // const clinicLowerCase = clinic.data?.name.toLowerCase();

  const toggleSettingsView = (view: SettingsKeys) => {
    setSettingsView(view);
  };

  const changeClinicId = (clinicId: string) => {
    setClinicId(clinicId);
  };

  return (
    <>
      {!clinics.isLoading && (
        <div>
          <header>
            <nav className="flex p-4 shadow-md items-center">
              <div className="flex items-center w-full justify-between">
                <h1>{clinic.data?.name}</h1>
                <div className="flex items-center gap-4">
                  <div>
                    <ModalWithContent
                      modalTitle="Lag ny klinikk"
                      buttonTitle="Legg til ny klinikk"
                    >
                      <ClinicForm />
                    </ModalWithContent>
                  </div>
                  <div>
                    <ModalWithContent
                      modalTitle="Alle klinikker"
                      buttonTitle="Alle klinikker"
                    >
                      {clinics.data?.map((clinic) => (
                        <Link
                          key={clinic.id}
                          href={{
                            pathname: `${clinic.name.toLowerCase()}`,
                          }}
                        >
                          <span
                            className="w-full p-4 flex cursor-pointer hover:bg-gray-100 rounded-lg"
                            onClick={(e) => {
                              console.log(e);
                              setClinicId(clinic.id);
                              setModalOpen(!modalOpen);
                            }}
                          >
                            {clinic.name}
                          </span>
                        </Link>
                      ))}
                    </ModalWithContent>
                  </div>
                </div>
              </div>
            </nav>
          </header>
          <div className="flex">
            <SideBarMenu
              toggleSettingsView={(view) => toggleSettingsView(view)}
            />

            <div className="p-12 w-full">{getSettingsView(settingsView)}</div>
          </div>
        </div>
      )}
    </>
  );
};

/* export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  return {
    props: {
      params,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
}; */

export default Clinic;
