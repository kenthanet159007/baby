import { BirthdaySurprise } from "@/components/BirthdaySurprise";
import { loveStory } from "@/data/loveStory";

export default function Home() {
  return <BirthdaySurprise story={loveStory} />;
}
