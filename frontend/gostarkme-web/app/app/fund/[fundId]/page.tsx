import Fund from "@/components/modules/Fund/Fund";
import Bounded from "@/components/ui/Bounded";
import Divider from "@/components/ui/Divider";

export function generateStaticParams() {
  return [{ fundId: '1' }]
}

const FundDetailsPage = async ({ params }: { params: { fundId: string } }) => {
  return (
    <>
      <Bounded className="px-60 text-lg">
        <h2 className="font-bold">User fund - {params.fundId}</h2>
        <Divider />
        <Fund message="I need some Starks to finish my project."></Fund>
      </Bounded>
    </>
  );
};

export default FundDetailsPage;
