import React, { useContext } from "react";
import "./Category.css";
import StoreContext from "../../Contexts/Store";
function Category() {
  const {category, setCategory } = useContext(StoreContext);
  const list = [
    "Beauty & Wellness",
    "Medical & Health Services",
    "Car Services",
    "Educational",
    "Restaurant",
    "Others",
  ];
  return (
    <div className="category">
      <ul>
        {list.map((item,indx) => {
          return (
            <li key={indx}
              onClick={() => {
                setCategory((prevCategory) => {
                  if (prevCategory === item) {
                    return "All";
                  } else {
                    return item;
                  }
                });
              }}

              className={category===item?"nav-active":""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Category;
