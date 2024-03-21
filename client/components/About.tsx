'use client'
import React from "react"
import Image from 'next/image'
import Collaborate from "../public/collaborate.png"
import Communication from "../public/communication.png"
import Idea from "../public/idea.png"

const About = () => {
    const tableData = [
        {
            image: Collaborate,
            title: "Collaborate",
            text: "Unlock the power of teamwork and academic synergy like never before. With LearnLink's cutting-edge collaboration features, you can effortlessly join study groups, brainstorm ideas, and tackle projects together in real-time. Whether you're working on a group assignment or seeking peer feedback, our platform fosters a collaborative environment where knowledge sharing is encouraged and productivity thrives."
        },
        {
            image: Communication,
            title: "Communicate",
            text: "Break the barriers of distance and engage with classmates in vibrant social spaces designed to foster friendships and camaraderie. From casual chats to virtual hangouts, LearnLink provides a dynamic platform for students to bond over shared interests, exchange experiences, and unwind from academic pressures. Whether you're looking for study buddies, organizing events, or simply craving some social interaction, our inclusive community welcomes you with open arms."
        },
        {
            image: Idea,
            title: "Learn",
            text: "Dive into a rich repository of educational resources, curated specifically to enhance your academic experience. With LearnLink's robust learning tools, you can access course materials, collaborate on study guides, and engage in interactive learning activities with peers. Whether you're seeking clarification on complex concepts or exploring new subjects, our platform offers a diverse array of learning opportunities to suit your needs."
        },
    ];
    return (
        <div className="w-full py-14 mt-1.5">
            <div className="flex justify-center items-center flex-col">
                <p>Why Learnlink?</p>
                <h1 className="text-blue-400">About Us</h1>
                <p className="w-[500px]">
                Whether you're looking to study together, share resources, or
                simply unwind with fellow learners, LearnLink's intuitive
                interface makes it easy to build meaningful connections with
                classmates from across the globe.   
                </p>
            </div>
            <div className="mt-5 flex justify-center items-center flex-wrap">
                {tableData.map((data, index) => (
                    <div key={index} className="w-[290px] min-h-[350px] bg-[white] flex flex-col justify-center items-center text-center text-[#505050] mx-8 my-4 px-8 py-4 rounded-2xl">
                        <div className="">
                            <Image src={data.image} alt={data.title} width={75} height={75}/>
                        </div>
                        <h2 className="text-blue-400">{data.title}</h2>
                        <p>{data.text}</p>
                    </div>
                ))}

            </div>
        
        </div>
    )
}

export default About