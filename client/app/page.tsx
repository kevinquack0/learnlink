"use client";
import Image from "next/image";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Home.module.scss";

const sections = [
  {
    title: "Collaborate",
    text: "Collaborate Seamlessly with LearnLink! Unlock the power of teamwork and academic synergy like never before. With LearnLink's cutting-edge collaboration features, you can effortlessly join study groups, brainstorm ideas, and tackle projects together in real-time. Whether you're working on a group assignment or seeking peer feedback, our platform fosters a collaborative environment where knowledge sharing is encouraged and productivity thrives. Experience the future of collaborative learning with LearnLink – where teamwork truly makes the dream work!",
  },
  {
    title: "Socialize",
    text: "Connect and Socialize with Ease on LearnLink! Break the barriers of distance and engage with classmates in vibrant social spaces designed to foster friendships and camaraderie. From casual chats to virtual hangouts, LearnLink provides a dynamic platform for students to bond over shared interests, exchange experiences, and unwind from academic pressures. Whether you're looking for study buddies, organizing events, or simply craving some social interaction, our inclusive community welcomes you with open arms. Join LearnLink today and discover a world of social possibilities right at your fingertips!",
  },
  {
    title: "Learn",
    text: "Empower Your Learning Journey with LearnLink! Dive into a rich repository of educational resources, curated specifically to enhance your academic experience. With LearnLink's robust learning tools, you can access course materials, collaborate on study guides, and engage in interactive learning activities with peers. Whether you're seeking clarification on complex concepts or exploring new subjects, our platform offers a diverse array of learning opportunities to suit your needs. Elevate your learning experience and unlock your full potential with LearnLink – where knowledge knows no bounds!",
  },
];

type ActionButtonProps = {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
};

const ActionButton = ({ className, onClick, children }: ActionButtonProps) => (
  <Button className={className} onClick={onClick}>
    {children}
  </Button>
);

export default function Home() {
  const router = useRouter();

  return (
    <div
      id="__next"
      className="bg-gradient-to-t from-sky-500 to-indigo-500 min-h-screen"
    >
      <p className="text-4xl text-white text-center font-bold p-6">LEARNLINK</p>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row w-3/4 justify-start pb-6">
          <div className="flex flex-col items-start space-y-4 w-1/2 p-6">
            <p className="text-2xl text-white font-semibold">
              Welcome to LearnLink, slogan
            </p>
            <p className="text text-white">
              Welcome to LearnLink, your ultimate student social hub! Designed
              by students, for students, LearnLink is the go-to platform for
              connecting, collaborating, and thriving in your academic journey.
              Whether you're looking to study together, share resources, or
              simply unwind with fellow learners, LearnLink's intuitive
              interface makes it easy to build meaningful connections with
              classmates from across the globe. Join the community
              revolutionizing the way students learn and socialize – join
              LearnLink today!
            </p>
            <ActionButton
              className="ui yellow button circular w-1/2"
              onClick={() => router.push("/signup")}
            >
              Signup
            </ActionButton>
            <ActionButton
              className="ui secondary button circular w-1/2"
              onClick={() => {}}
            >
              Login
            </ActionButton>
          </div>
          <div className="flex justify-center items-center w-1/2">
            <Image
              src="/background-students.jpg"
              alt="education"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex h-1/3"></div>

        <div className="flex justify-center items-start bg-white rounded-lg w-3/4 p-6 space-x-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 w-1/3"
            >
              <p className="text-2xl text-yellow-600 font-semibold">
                {section.title}
              </p>
              <p className="text text-black text-center">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
