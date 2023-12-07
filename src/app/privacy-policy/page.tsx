import H1 from "@/components/H1";
import { Text } from "@chakra-ui/react";

export default async function Index() {
  return (
    <div className="">
      <H1 preText="Privacy" gradientText="Policy" />
      <div className="flex flex-col justify-center text-center">
        <Text>
          We care about your privacy and only collect the necessary information
          for you to be able to sign in to our site and manage your
          certifications and ratings.
        </Text>
        <Text>
          Your profile will be connected to the certifications and ratings that
          you add.
        </Text>
      </div>
    </div>
  );
}
