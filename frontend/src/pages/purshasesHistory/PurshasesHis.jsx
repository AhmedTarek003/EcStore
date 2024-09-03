import Header from "../../components/header/Header";
import Purshases from "../../components/purshases/Purshases";
import { useAuthContext } from "../../context/AuthContext";

const PurshasesHis = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <Header />
      <Purshases purshasesIds={authUser?.purshasesHistory} />
    </>
  );
};

export default PurshasesHis;
