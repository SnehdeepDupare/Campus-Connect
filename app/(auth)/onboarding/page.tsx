import { OnboardingForm } from "@/components/auth/onboarding-form";
import { fetchUser } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col justify-start px-5 md:px-10 py-20">
      <div>
        <h1 className="font-bold text-3xl">Onboarding</h1>
        <p className="mt-2">Complete your profile to proceed further</p>
      </div>

      <section className="mt-10 p-10 bg-[#121417] rounded-lg">
        <OnboardingForm user={userData} />
      </section>
    </main>
  );
};

export default OnboardingPage;
