import React, { useState, useEffect, useContext } from "react";
import Header from "./header/Header";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";
// import { FaUsers } from 'react-icons/fa';
// import { BsInfoLg } from 'react-icons/bs';
import Sidenavbar from "./Sidenavbar";
import Topnavbar from "./Topnavbar";
import ImageSlider from "./ImageSlider";
import Footer from "./Footer";
import ProgressBar from "react-bootstrap/ProgressBar";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
//import { Carousel } from  "react-carousel-minimal";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [countOfProgess, setCountOfProgess] = React.useState(0);

  const userHomePage = async () => {
    // try {
    //   const res = await fetch("http://localhost:8000/api/v1/employees/getdata", {
    //     method: "GET",
    //     headers: {
    //       // "Content-Type": "application/json",
    //      "Authorization":JSON.parse(localStorage.getItem('token'))
    //     },
    //   });
    //   const data = await res.json();
    //   console.log("dataa : ",data);
    //   setUserName(data.name);
    //   setShow(true);

    //   // if(!res.status===200){
    //   //     const error = new Error(res.error)
    //   //     throw error;
    //   // }
    // } catch (error) {
    //   console.log(error);
    // }

    const items = JSON.parse(localStorage.getItem("user"));
    console.log("Username : ", items);
    if (items) {
      setUserName(items);
    }
  };
  useEffect(() => {
    userHomePage();
  }, []);

  const slides = [
    { url: "http://localhost:3000/image-1.jpg", title: "beach" },
    { url: "http://localhost:3000/image-2.jpg", title: "boat" },
    { url: "http://localhost:3000/image-3.jpg", title: "forest" },
    { url: "http://localhost:3000/image-4.jpg", title: "city" },
    { url: "http://localhost:3000/image-5.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "1000px",
    height: "400px",
    margin: "30px",
    transition: "1000ms",
    // transform: `translate3d(${-index * 100}%, 0, 0)`
  };
  const delay = 2500;
  React.useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {};
  }, [index]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountOfProgess((oldProgress) => {
        if (100 == oldProgress) return 0;
        return Math.min(oldProgress + Math.random() * 10, 100);
      });
    }, 499);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const data = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
      caption: `<div>
                  San Francisco
                  <br/>
                  Next line
                </div>`
    },
    {
      image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
      caption: "Scotland"
    },
    {
      image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
      caption: "Darjeeling"
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
      caption: "San Francisco"
    },
    {
      image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
      caption: "Scotland"
    },
    {
      image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
      caption: "Darjeeling"
    },
    {
      image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
      caption: "San Francisco"
    },
    {
      image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
      caption: "Scotland"
    },
    {
      image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
      caption: "Darjeeling"
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <>
      <div id="wrapper">
        <Sidenavbar />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topnavbar />

            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">
                  Welcome Back {userName.name}{" "}
                </h1>
                {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
              </div>

              <div className="row">
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Earnings (Monthly)
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            $40,000
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Earnings (Annual)
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            $215,000
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            Tasks
                          </div>
                          <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                50%
                              </div>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm mr-2">
                                <div
                                  className="progress-bar bg-info"
                                  role="progressbar"
                                  style={{ width: "50%" }}
                                  aria-valuenow="50"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Pending Requests
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            18
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300"></i>
                        </div>
                      </div>
                      Name
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div style={{ display: "block", width: 1000, padding: 30 }}>
                <h4>React-Bootstrap ProgressBar Component</h4>
                Current Progress is: {parseInt(countOfProgess)} %
                <ProgressBar now={countOfProgess} />
              </div>

              <div>
                <h1>Hello Here is the Slide show</h1>

                <div style={containerStyles}>
                  <ImageSlider slides={slides} />
                </div>
              </div>


                   {/* <div style={{ textAlign: "center" }}>
                    <h2>React Carousel Minimal</h2>
                    <p>Easy to use, responsive and customizable carousel component for React Projects.</p>
                    <div style={{
                    padding: "0 20px"
                    }}>
                    <Carousel
                      data={data}
                      time={2000}
                      width="850px"
                      height="500px"
                      captionStyle={captionStyle}
                      radius="10px"
                      slideNumber={true}
                      slideNumberStyle={slideNumberStyle}
                      captionPosition="bottom"
                      automatic={true}
                      dots={true}
                      pauseIconColor="white"
                      pauseIconSize="40px"
                      slideBackgroundColor="darkgrey"
                      slideImageFit="cover"
                      thumbnails={true}
                      thumbnailWidth="100px"
                      style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                       margin: "40px auto",
                         }}
                     />
                  </div>
                  </div> */}

<h1 style={{ textAlign: "center" }}>Example to setup your carousel in react</h1>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          {/* {data.map(data=><div key={data.title}>{data.image}</div>)} */}
          {/* <div style={containerStyles}>
                  <ImageSlider slides={slides} />
                </div> */}
          <Item><ImageSlider slides={slides}></ImageSlider></Item>
          <Item><ImageSlider slides={slides}></ImageSlider></Item>
          <Item><ImageSlider slides={slides}></ImageSlider></Item>
          <Item>Four</Item>
          <Item>Five</Item>
          <Item>Six</Item>
          <Item>Seven</Item>
          <Item>Eight</Item> 
        </Carousel>
      </div>


            </div>
          </div>
          <Footer />
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
};

export default Dashboard;
