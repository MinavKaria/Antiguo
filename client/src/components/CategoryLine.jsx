import React, { useState } from "react";

function CategoryLine({ category, categoryChange }) {
  const [selected, setSelected] = useState(false);

  const handleCategoryClick = () => {
    if (!selected) {
      categoryChange[0](category);
    } else {
      categoryChange[1](category);
    }
    setSelected(!selected);
  };

  return (
    <li>
      <p
        className="text-gray-700 hover:text-gray-900 cursor-pointer"
        onClick={handleCategoryClick}
      >
        {category} {selected ? "✔" : ""}
      </p>
    </li>
  );
}

export default CategoryLine;
