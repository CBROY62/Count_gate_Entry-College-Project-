
import React from "react";
import Nabvar from "../components/Nabvar";
import "../StyleSection/History.css";
import  Footer  from "../components/Footer"


const students = [
  {
    name: "Chandra Bhushan Kumar",
    branch: "CSE",
    age: 20,
    time: "10:00 AM",
    image: "/images/bhushan.jpg",
  },
  {
    name: "amarjeet",
    branch: "ECE",
    age: 21,
    time: "11:00 AM",
    image: "/images/amarjeet.jpg",
  },
  {
    name: "kavya",
    branch: "IT",
    age: 22,
    time: "09:30 AM",
    image: "/images/kavya.jpg",
  },
  {
    name: "ashima",
    branch: "ME",
    age: 23,
    time: "12:00 PM",
    image: "/images/ashima.jpg",
  },
  {
    name: "gyanendra Singh",
    branch: "EE",
    age: 20,
    time: "08:45 AM",
    image: "/images/gyanendra.jpg",
  },
];

const History = () => {
  return (
    <>
      <Nabvar />
      <div className="main">
        <div className="components-grid">
          {students.map((student, index) => (
            <div className="component-box" key={index}>
              <p><strong>Name:</strong> {student.name}</p>
              <img src={student.image} alt={student.name} />
              <p><strong>Branch:</strong> {student.branch}</p>
              <p><strong>Age:</strong> {student.age} years</p>
              <p><strong>Timing:</strong> {student.time}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default History;

