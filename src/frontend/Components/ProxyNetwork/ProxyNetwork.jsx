import React, { useRef, useEffect } from "react";
import { select, hierarchy, tree, linkHorizontal, linkVertical } from "d3";
//import { ITree } from "../../../Types/Types";

const testData = {
  name: 'Test 1',
  children: [
    {
      name: 'Parent 1',
      children: [
        {
          name: 'Child 1'
        },
        {
          name: 'Child 2'
        },
        {
          name: 'Child 5'
        }
      ]
    },
    {
      name: 'Parent 2',
      children: [
        {
          name: 'Child 3',
          children: [
            {
              name: 'Child 4'
            }
          ]
        }
      ]
    }
  ]
}

const TreeChart = ({ data }) => {

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const root = hierarchy(data);
    const treeLayout = tree().size([300, 150]);
    treeLayout(root);

    //nodes
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join('circle')
      .attr('class', 'node')
      .attr('r', 10)
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('cx', node => node.x)
      .attr('cy', node => node.y)

    //links
    const linkCords = linkVertical()
      .x(node => node.x)
      .y(node => node.y);

    svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', link => linkCords(link))

    console.log(root.descendants());
    console.log(root.links());
  }, [data]);

  return (
    <div>
      <h1>Test</h1>
      <svg ref={svgRef}></svg>
    </div>
  )
}

const ProxyNetwork = () => {
  return (
    <div>
      <TreeChart data={testData} />
    </div>
  );
}

export default ProxyNetwork;