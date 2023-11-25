import H1 from "@/components/H1";
import PrimaryButton from "@/components/PrimaryButton";

export default async function Index() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <H1 preText="Welcome to " gradientText="CertBase" />
      <div className="flex justify-center">
        <PrimaryButton
          text="View Certifications"
          href="/certifications"
          ariaLabel="View Certifications"
        />
      </div>
    </div>
  );
}
