import TreeView from "./components/TreeView/TreeView";
import dataJson from "./data.json";
import { useEffect, useState } from "react";

function App() {
  const initializeData = (items, parentId = null) => {
    Object.values(items).forEach((item) => {
      if (parentId) item.parentId = parentId;
      item.isChecked = false;
      item.partialCheck = false;
      if (item.children) {
        initializeData(item.children, item.id);
      }
    });
    return items;
  };

  const loadData = () => {
    const storedData = localStorage.getItem("treeData");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return initializeData(JSON.parse(JSON.stringify(dataJson)));
  };

  const [data, setData] = useState(loadData());

  useEffect(() => {
    localStorage.setItem("treeData", JSON.stringify(data));
  }, [data]);

  return (
    <div>
      <TreeView data={data} setData={setData} />
    </div>
  );
}

export default App;
