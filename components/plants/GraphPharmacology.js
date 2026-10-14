"use client";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

export default function GraphPharmacology({ data }) {
  const PHARMACOLOGY = useSelector((state) => state.pharmacology);
  const chartRef = useRef(null);

  const categories = [
    { name: "Plant" },
    { name: "PlantPart" },
    { name: "Compound" },
    { name: "Disease" },
    { name: "Phenotype" },
    { name: "Symptom" },
  ];

  const nodes = Object.values(PHARMACOLOGY?.data?.graph?.nodes || {}).map(
    (node) => ({
      id: node?.id,
      labels: node?.labels,
      properties: node?.properties,
      name: node?.properties?.label,
      category: getCategoryIndex(node?.labels),
    })
  );

  function getCategoryIndex(labels) {
    for (let i = 0; i < categories.length; i++) {
      if (labels.includes(categories[i].name)) {
        return i;
      }
    }
    return -1;
  }

  function getNodeIndexById(nodeId) {
    return nodes.findIndex((node) => node.id === nodeId);
  }

  // PLANT PARTS LINKS
  const hasParts = PHARMACOLOGY.data?.plant_parts?.map(
    (part) => part?.has_part
  );

  const linkPart = hasParts?.map((link) => ({
    source: getNodeIndexById(link?.source),
    target: getNodeIndexById(link?.target),
  }));

  // COMPOUND LINKS
  const hasCompound = PHARMACOLOGY.data?.plant_compounds?.map(
    (part) => part?.has_compound
  );

  const seenLinks = {};

  const linkCompound = hasCompound
    ?.filter((link) => {
      const source = getNodeIndexById(link?.source);
      const target = getNodeIndexById(link?.target);
      const key = `${source}-${target}`;
      if (seenLinks[key]) {
        return false;
      }
      seenLinks[key] = true;
      return true;
    })
    .map((link) => ({
      source: getNodeIndexById(link?.source),
      target: getNodeIndexById(link?.target),
    }));

  // SIDE EFFECT LINKS
  const hasSideEffect = PHARMACOLOGY.data?.side_effects?.map(
    (part) => part?.has_side_effect
  );

  const linkSideEffect = hasSideEffect?.map((link) => ({
    source: getNodeIndexById(link?.source),
    target: getNodeIndexById(link?.target),
  }));

  const combinedLinks = linkPart?.concat(linkCompound, linkSideEffect);

  const option = {
    title: {
      text: `${data} Pharmacology Graph`,
      subtext: "Default layout",
      top: "bottom",
      left: "left",
    },
    legend: {
      data: [
        "Plant",
        "PlantPart",
        "Compound",
        "Disease",
        "Phenotype",
        "Symptom",
      ],
    },
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
        draggable: true,
        data: nodes,
        categories: categories,
        force: {
          edgeLength: 100,
          repulsion: 300,
          gravity: 0.1,
        },
        edges: combinedLinks,
        lineStyle: {
          color: "source",
          curveness: 0.1,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 8,
          },
        },
        symbolSize: 30,
      },
    ],
    toolbox: {
      show: true,
      top: "bottom",
      feature: {
        saveAsImage: {},
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current.getEchartsInstance();
    chart.showLoading();
    setTimeout(() => {
      chart.hideLoading();
      chart.setOption(option);
    }, 2000);
  }, [PHARMACOLOGY]);

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
