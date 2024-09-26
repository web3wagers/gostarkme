const FundDetailsPage = async ({ params }: { params: { fundId: string } }) => {
  return (
    <>
      <h1 className="text-4xl mb-3 font-black">{params.fundId}</h1>
    </>
  );
};

export default FundDetailsPage;
