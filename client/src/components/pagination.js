import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  const NoOfButtons = Math.ceil(total / showPerPage);
  // console.log("Buttons :", NoOfButtons);

  useEffect(() => {
    setNumberOfButtons(NoOfButtons);
  });
  const [numberOfButtons, setNumberOfButtons] = useState();

  // console.log("total & showperpage",total,"/",showPerPage,"=",total/showPerPage)
  // console.log("nO. OF BUTTON",numberOfButtons)

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {  
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={() => onButtonClick("prev")}>
              Previous
            </button>
          </li>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <li
              className={`page-item ${index + 1 === counter ? "active" : null}`}
              key={index}
            >
              <button
                className="page-link"
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={() => onButtonClick("next")}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;