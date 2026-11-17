import { requireUser } from "@/lib/auth-guard";
import { FlyHome } from "@/components/fly-home";

export default async function FlyPage() {
  await requireUser();
  return <FlyHome />;
}
