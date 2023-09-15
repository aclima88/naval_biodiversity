// // Define the URL for the JSON data
// const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// // Promise Pending
// const dataPromise = d3.json(dataURL);
// console.log("Data Promise: ", dataPromise);

// // Fetch the JSON data and console log it
// d3.json(dataURL).then(function(data) {
//   console.log(data);
// });

// // Function to create the bar chart
// function createBarChart(sampleData) {
//   // Get the top 10 OTUs
//   const top10Data = sampleData.sample_values.slice(0, 10).reverse();
//   const top10OtuIds = sampleData.otu_ids.slice(0, 10).reverse();
//   const top10OtuLabels = sampleData.otu_labels.slice(0, 10).reverse();

//   // Create the trace for the horizontal bar chart
//   const trace = {
//     x: top10Data,
//     y: top10OtuIds.map(id => `OTU ${id}`),
//     text: top10OtuLabels,
//     type: "bar",
//     orientation: "h"
//   };

//   // Create the data array
//   const data = [trace];

//   // Create the layout for the chart
//   const layout = {
//     title: "Top 10 OTUs Found in Individual",
//     xaxis: { title: "Sample Values" },
//     yaxis: { title: "OTU ID" },
//   };

//   // Plot the chart
//   Plotly.newPlot("bar", data, layout);
// }

// // Function to create the bubble chart
// function createBubbleChart(sampleData) {
//   const trace = {
//     x: sampleData.otu_ids,
//     y: sampleData.sample_values,
//     mode: "markers",
//     marker: {
//       size: sampleData.sample_values,
//       color: sampleData.otu_ids,
//       colorscale: "Viridis",
//       opacity: 0.7
//     },
//     text: sampleData.otu_labels
//   };

//   const data = [trace];

//   const layout = {
//     title: "OTU ID vs. Sample Values",
//     xaxis: { title: "OTU ID" },
//     yaxis: { title: "Sample Values" }
//   };

//   Plotly.newPlot("bubble", data, layout);
// }

// // Function to handle dropdown menu change
// function optionChanged(selectedValue) {
//   // Fetch the data for the selected individual
//   d3.json(dataURL).then(data => {
//     const individualData = data.samples.find(sample => sample.id === selectedValue);
//     createBarChart(individualData);
//     createBubbleChart(individualData);
//   });
// }

// // Initial function to load data and create the default chart
// function init() {
//   // Fetch the data and populate the dropdown menu
//   d3.json(dataURL).then(data => {
//     const dropdown = d3.select("#selDataset");
//     data.names.forEach(name => {
//       dropdown.append("option").text(name).property("value", name);
//     });

//     // Create the initial chart with the first individual
//     createBarChart(data.samples[0]);
//     createBubbleChart(data.samples[0]);
//   });
// }

// // Initialize the web page
// init();





// Define the URL for the JSON data
const dataURL =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to display sample metadata
function displaySampleMetadata(metadata) {
  // Select the HTML element to display metadata
  const metadataDiv = d3.select("#sample-metadata");

  // Clear existing metadata
  metadataDiv.html("");

  // Iterate through the key-value pairs and display them
  Object.entries(metadata).forEach(([key, value]) => {
    metadataDiv.append("p").text(`${key}: ${value}`);
  });
}

// Function to create the bar chart
function createBarChart(sampleData) {
  // Get the top 10 OTUs
  const top10Data = sampleData.sample_values.slice(0, 10).reverse();
  const top10OtuIds = sampleData.otu_ids.slice(0, 10).reverse();
  const top10OtuLabels = sampleData.otu_labels.slice(0, 10).reverse();

  // Create the trace for the horizontal bar chart
  const trace = {
    x: top10Data,
    y: top10OtuIds.map((id) => `OTU ${id}`),
    text: top10OtuLabels,
    type: "bar",
    orientation: "h",
  };

  // Create the data array
  const data = [trace];

  // Create the layout for the chart
  const layout = {
    title: "Top 10 OTUs Found in Individual",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU ID" },
  };

  // Plot the chart
  Plotly.newPlot("bar", data, layout);
}

// Function to create the bubble chart
function createBubbleChart(sampleData) {
  const trace = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    mode: "markers",
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids,
      colorscale: "Viridis",
      opacity: 0.7,
    },
    text: sampleData.otu_labels,
  };

  const data = [trace];

  const layout = {
    title: "OTU ID vs. Sample Values",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" },
  };

  Plotly.newPlot("bubble", data, layout);
}

// Function to handle dropdown menu change
function optionChanged(selectedValue) {
  // Fetch the data for the selected individual
  d3.json(dataURL).then((data) => {
    const individualData = data.samples.find((sample) => sample.id === selectedValue);

    // Update metadata
    displaySampleMetadata(
      data.metadata.find((meta) => meta.id.toString() === selectedValue)
    );

    createBarChart(individualData);
    createBubbleChart(individualData);
  });
}

// Initial function to load data and create the default chart
function init() {
  // Fetch the data and populate the dropdown menu
  d3.json(dataURL)
    .then((data) => {
      const dropdown = d3.select("#selDataset");
      data.names.forEach((name) => {
        dropdown.append("option").text(name).property("value", name);
      });

      // Create the initial chart with the first individual and display metadata
      displaySampleMetadata(data.metadata[0]);
      createBarChart(data.samples[0]);
      createBubbleChart(data.samples[0]);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
}

// Initialize the web page
init();
