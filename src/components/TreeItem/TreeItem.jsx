import { useState } from "react";
import PropTypes from "prop-types";
import "./TreeItem.css";

const TreeItem = ({ data, item, changeJson }) => {
  const [isChildrenVisible, setIsChildrenVisible] = useState(false);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    changeJson(item.id, isChecked);
  };

  return (
    <div className="TreeItem">
      <div className="TreeItemDiv">
        <label>
          <input
            style={{ background: "red" }}
            type="checkbox"
            checked={item.isChecked || false}
            onChange={handleCheckboxChange}
            className={`TreeCheckBox ${
              item.partialCheck ? "partialCheck" : ""
            }`}
          />
          <span style={{ fontSize: `${18 - item?.level * 2}px` }}>
            {item?.name}
          </span>
        </label>
        {item.children && Object.keys(item.children).length > 0 && (
          <button onClick={() => setIsChildrenVisible(!isChildrenVisible)}>
            {isChildrenVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {isChildrenVisible && item.children && (
        <div className="TreeSubItem">
          {Object.entries(item.children).map(([childId, childData]) => (
            <div className="TreeSubItemRow" key={childId}>
              <div className="TreeArrow" />
              <TreeItem
                data={data}
                item={childData}
                itemId={childId}
                changeJson={changeJson}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

TreeItem.propTypes = {
  data: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
  changeJson: PropTypes.func.isRequired,
};

export default TreeItem;
