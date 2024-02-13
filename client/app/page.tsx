"use client";
import Image from "next/image";

import { Button } from "semantic-ui-react";
import { useFetch } from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, loading, error, fetchData } = useFetch(
    "/users/register",
    "POST"
  );
  console.log("loading", loading);
  console.log("data", data);
  const router = useRouter();
  return (
    <div className="bg-gradient-to-t from-sky-500 to-indigo-500">
      <p className="text-4xl text-white text-center font-bold p-6">LEARNLINK</p>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-row w-3/4 justify-start pb-6">
          <div className="flex flex-col items-start space-y-4 w-1/2 p-6">
            <p className="text-2xl text-white font-semibold">
              Welcome to LearnLink, slogan
            </p>
            <p className="text text-white">
              "Welcome to LearnLink, your ultimate student social hub! Designed
              by students, for students, LearnLink is the go-to platform for
              connecting, collaborating, and thriving in your academic journey.
              Whether you're looking to study together, share resources, or
              simply unwind with fellow learners, LearnLink's intuitive
              interface makes it easy to build meaningful connections with
              classmates from across the globe. Join the community
              revolutionizing the way students learn and socialize – join
              LearnLink today!"
            </p>
            <Button
              className="ui yellow button circular w-1/2"
              onClick={() => {
                router.push("/home");
              }}
            >
              Go to Home
            </Button>
            <Button
              className="ui secondary button circular w-1/2"
              onClick={() => {
                fetchData();
              }}
            >
              Login
            </Button>
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
          <div className="flex flex-col items-center space-y-4 w-1/3">
            <p className="text-2xl text-yellow-600 font-semibold">Features</p>
            <p className="text text-black text-center">
              The Navy Seal copypasta, also sometimes known as Gorilla Warfare
              due to a misspelling of "guerrilla warfare" in its contents, is an
              aggressive but humorous attack paragraph supposedly written by an
              extremely well-trained member of the United States Navy SEALs
              (hence its name) to an unidentified "kiddo", ostensibly whoever
              the copypasta is directed to. Written in a manner similar to a
              non-serious death threat, the copypasta has the author threaten
              the recipient while boasting of their own increasingly absurd or
              unfeasible accomplishments, such as having "over 300 confirmed
              kills" or being able to kill someone "in over seven hundred ways,
              and thats just with my bare hands". This copypasta is often
              reposted as a humorous overreaction to an insult and is thought to
              have originated on the military-themed imageboard OperatorChan,
              although the earliest known usage of the copypasta was on 4chan on
              November 11th, 2010.[4]
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 w-1/3">
            <p className="text-2xl text-yellow-600 font-semibold">Features</p>
            <p className="text text-black text-center">
              The Navy Seal copypasta, also sometimes known as Gorilla Warfare
              due to a misspelling of "guerrilla warfare" in its contents, is an
              aggressive but humorous attack paragraph supposedly written by an
              extremely well-trained member of the United States Navy SEALs
              (hence its name) to an unidentified "kiddo", ostensibly whoever
              the copypasta is directed to. Written in a manner similar to a
              non-serious death threat, the copypasta has the author threaten
              the recipient while boasting of their own increasingly absurd or
              unfeasible accomplishments, such as having "over 300 confirmed
              kills" or being able to kill someone "in over seven hundred ways,
              and thats just with my bare hands". This copypasta is often
              reposted as a humorous overreaction to an insult and is thought to
              have originated on the military-themed imageboard OperatorChan,
              although the earliest known usage of the copypasta was on 4chan on
              November 11th, 2010.[4]
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 w-1/3">
            <p className="text-2xl text-yellow-600 font-semibold">Features</p>
            <p className="text text-black text-center">
              The Navy Seal copypasta, also sometimes known as Gorilla Warfare
              due to a misspelling of "guerrilla warfare" in its contents, is an
              aggressive but humorous attack paragraph supposedly written by an
              extremely well-trained member of the United States Navy SEALs
              (hence its name) to an unidentified "kiddo", ostensibly whoever
              the copypasta is directed to. Written in a manner similar to a
              non-serious death threat, the copypasta has the author threaten
              the recipient while boasting of their own increasingly absurd or
              unfeasible accomplishments, such as having "over 300 confirmed
              kills" or being able to kill someone "in over seven hundred ways,
              and thats just with my bare hands". This copypasta is often
              reposted as a humorous overreaction to an insult and is thought to
              have originated on the military-themed imageboard OperatorChan,
              although the earliest known usage of the copypasta was on 4chan on
              November 11th, 2010.[4]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
