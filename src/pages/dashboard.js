import Principal from "@/Components/Principal";
import withAuth from "@/Components/VerificacaoLogin/withAuth";

const Dashboard = () => {
  return (
    <>
      <Principal />
    </>
  );
};

export default withAuth(Dashboard);
