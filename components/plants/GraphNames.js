"use client";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";

export default function GraphNames({ data }) {
  const chartRef = useRef(null);
  const nodes = [];
  const seenNames = new Set();

  data?.views?.apache_echart_graph?.nodes.forEach((node) => {
    const name = node?.properties?.label;
    if (!seenNames.has(name)) {
      seenNames.add(name);
      nodes.push({
        id: node?.id,
        properties: node?.properties,
        name: name,
        category: node?.category,
      });
    }
  });

  function getNodeIndexById(nodeId) {
    return nodes.findIndex((node) => node.id === nodeId);
  }

  const links = data?.views?.apache_echart_graph?.links.map((link) => ({
    source: getNodeIndexById(link?.source),
    target: getNodeIndexById(link?.target),
  }));

  // console.log(data?.views?.apache_echart_graph?.categories, "ini node");

  const option = {
    title: {
      text: `${data} Names Graph`,
      subtext: "Default layout",
      top: "bottom",
      left: "left",
    },
    legend: {
        data: ['Plant', 'Scientific Name', 'Common Name', 'Local Name', 'Ethnic']
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          animation: false,
          label: {
            position: 'right',
            formatter: '{b}'
          },
          draggable: true,
          data: nodes,
          categories: data?.views?.apache_echart_graph?.categories,
          force: {
            edgeLength: 5,
            repulsion: 20,
            gravity: 0.2
          },
          edges: links
        }
      ]
  };

  useEffect(() => {
    const chart = chartRef.current.getEchartsInstance();
    if (chart) {
      chart.showLoading();
      setTimeout(() => {
        chart.hideLoading();
        chart.setOption(option);
      }, 2000);
    }
  }, [data]);

  return (
    <div className="h-full">
      {
        <ReactECharts
          ref={chartRef}
          option={option}
          style={{
            height: "100%",
            width: "100%",
          }}
          className="p-1 md:p-3 border rounded-lg shadow"
        />
      }
    </div>
  );
}
