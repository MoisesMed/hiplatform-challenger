import TreeItem from "../TreeItem/TreeItem";
import PropTypes from "prop-types";
import "./TreeView.css";

const TreeView = ({ data, setData }) => {
  const findItem = (items, idToFind) => {
    for (const key in items) {
      if (items[key].id === idToFind) {
        return items[key];
      }
      if (items[key].children) {
        const foundItem = findItem(items[key].children, idToFind);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return null;
  };

  const updateItemAndChildren = (currentItem, checked) => {
    currentItem.isChecked = checked;
    currentItem.partialCheck = false;
    if (currentItem.children) {
      Object.values(currentItem.children).forEach((child) =>
        updateItemAndChildren(child, checked)
      );
    }
  };

  const updateParentIfAllSiblingsChecked = (currentItem, items) => {
    if (currentItem.parentId) {
      const parentItem = findItem(items, currentItem.parentId);
      if (parentItem && parentItem.children) {
        const allSiblingsChecked = Object.values(parentItem.children).every(
          (child) => child.isChecked
        );
        const someSiblingsChecked = Object.values(parentItem.children).some(
          (child) => child.isChecked
        );
        parentItem.isChecked = allSiblingsChecked;
        parentItem.partialCheck = someSiblingsChecked && !allSiblingsChecked;
        updateParentIfAllSiblingsChecked(parentItem, items);
      }
    }
  };

  const handleCheck = (itemId, isChecked) => {
    setData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const itemToUpdate = findItem(newData, itemId);
      if (itemToUpdate) {
        updateItemAndChildren(itemToUpdate, isChecked);
        updateParentIfAllSiblingsChecked(itemToUpdate, newData);
      }
      return newData;
    });
  };

  return (
    <div className="MainTitle">
      <span>Árvore de Seleção</span>

      {Object.entries(data).map(([itemId, itemData]) => (
        <TreeItem
          data={data}
          item={itemData}
          itemId={itemId}
          changeJson={handleCheck}
          key={itemId}
        />
      ))}
    </div>
  );
};

TreeView.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default TreeView;
