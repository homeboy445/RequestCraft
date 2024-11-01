import { useState } from "react";

const CustomDropDown = ({
  items,
  updateSelectedItem,
}: {
  items: string[];
  updateSelectedItem: (value: string) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState(""); // State to track selected item

  const handleSelect = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue); // Update selected item when changed!
    updateSelectedItem(selectedValue);
    console.log(" selected: ", selectedValue);
  };

  return (
    <div style={{ width: "200px" }}>
      <select
        value={selectedItem}
        onChange={handleSelect}
        style={{
          width: "80%",
          padding: "3%",
          fontSize: "1rem",
          borderRadius: "5px",
          fontFamily: "Roboto",
        }}
      >
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropDown;
