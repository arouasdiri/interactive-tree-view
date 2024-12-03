import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import "./styles/TreeDiagram.css";

const TreeDiagram = ({ data }) => {
  const svgRef = useRef();

  const [expanded, setExpanded] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(
    (id) => {
      setExpanded((prev) => {
        const newExpanded = { ...prev };
        if (newExpanded[id]) {
          delete newExpanded[id];
        } else {
          newExpanded[id] = true;
        }
        return newExpanded;
      });
    },
    []
  );

  const toggleAllNodes = () => {
    if (isExpanded) {
      setExpanded({});
    } else {
      const expandAll = (node, expandedMap) => {
        expandedMap[node.id] = true;
        if (node.children) node.children.forEach((child) => expandAll(child, expandedMap));
      };
      const allExpanded = {};
      expandAll(data, allExpanded);
      setExpanded(allExpanded);
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 600;

    const root = d3.hierarchy(data);

    const filteredRoot = root.copy();
    filteredRoot.each((node) => {
      if (!expanded[node.data.id]) {
        node.children = null; 
      }
    });

    const treeLayout = d3.tree().size([height - 100, width - 200]);
    treeLayout(filteredRoot);

    const nodes = filteredRoot.descendants();
    const links = filteredRoot.links();

    svg
      .selectAll(".link")
      .data(links)
      .join("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
        .x((d) => d.y + 50)
        .y((d) => d.x))
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    const nodeGroups = svg
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y + 50},${d.x})`)
      .style("cursor", "pointer")
      .on("click", (event, d) => toggleExpand(d.data.id));

    nodeGroups
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => d.data.color || "#999")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    nodeGroups
      .append("text")
      .attr("x", 0)
      .attr("y", 35)
      .text((d) => d.data.name)
      .style("font-size", "12px")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("fill", "#333");
  }, [data, expanded, toggleExpand]);

  return (
    <div className="tree-diagram-container">
      <svg ref={svgRef} className="tree-diagram-svg" />
      <button onClick={toggleAllNodes} className="tree-diagram-button">
        {isExpanded ? "Alle Knoten schließen" : "Alle Knoten öffnen"}
      </button>
    </div>
  );
};

export default TreeDiagram;
