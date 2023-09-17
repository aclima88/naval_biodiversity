// Define the URL for the JSON data
const dataURL = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to display sample metadata
function displaySampleMetadata(metadata) {
  const metadataDiv = d3.select("#sample-metadata");

  metadataDiv.html("");

  Object.entries(metadata).forEach(([key, value]) => {
    metadataDiv.append("p").text(`${key}: ${value}`);
  });
}

// Function to create the bar chart
function createBarChart(sampleData) {
  const top10Data = sampleData.sample_values.slice(0, 10).reverse();
  const top10OtuIds = sampleData.otu_ids.slice(0, 10).reverse();
  const top10OtuLabels = sampleData.otu_labels.slice(0, 10).reverse();

  const barChartTrace = {
    x: top10Data,
    y: top10OtuIds.map((id) => `OTU ${id}`),
    text: top10OtuLabels,
    type: "bar",
    orientation: "h",
  };

  const barChartData = [barChartTrace];

  const barChartLayout = {
    title: "Top 10 OTUs Found in Individual",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU ID" },
  };

  Plotly.newPlot("bar", barChartData, barChartLayout);
}

//Function to create the gauge chart
function createGaugeChart(metadata) {
    // Get the washing frequency (wfreq) from the metadata
    const washingFrequency = metadata.wfreq;
    console.log("Washing Frequency:", washingFrequency);
    
    // Create the trace for the gauge chart
    const gaugeChartTrace = {
        value: washingFrequency,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
        axis: { range: [null, 9] },
        bar: { color: "rgba(8,29,88,0.3)" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
            { range: [0, 1], color: "rgba(255, 0, 0, 0.1)" },
            { range: [1, 2], color: "rgba(255, 0, 0, 0.2)" },
            { range: [2, 3], color: "rgba(255, 0, 0, 0.3)" },
            { range: [3, 4], color: "rgba(255, 0, 0, 0.4)" },
            { range: [4, 5], color: "rgba(255, 0, 0, 0.5)" },
            { range: [5, 6], color: "rgba(255, 0, 0, 0.6)" },
            { range: [6, 7], color: "rgba(255, 0, 0, 0.7)" },
            { range: [7, 8], color: "rgba(255, 0, 0, 0.8)" },
            { range: [8, 9], color: "rgba(255, 0, 0, 0.9)" },
        ],
        },
    };
    
    const gaugeChartData = [gaugeChartTrace];
    
    const gaugeChartLayout = {
        width: 600,
        height: 500,
        margin: { t: 0, b: 0 },
    };
    
    Plotly.newPlot("gauge", gaugeChartData, gaugeChartLayout);
    }
      



// Function to create the bubble chart
function createBubbleChart(sampleData) {
  const bubbleChartTrace = {
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

  const bubbleChartData = [bubbleChartTrace];

  const bubbleChartLayout = {
    title: "OTU ID vs. Sample Values",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" },
  };

  Plotly.newPlot("bubble", bubbleChartData, bubbleChartLayout);
}
  

// Function to handle dropdown menu change
function optionChanged(selectedValue) {
    d3.json(dataURL)
      .then((data) => {
        const individualData = data.samples.find((sample) => sample.id === selectedValue);
        const metadata = data.metadata.find((meta) => meta.id.toString() === selectedValue);
  
        console.log("Metadata:", metadata);  // Log the metadata
  
        displaySampleMetadata(metadata);
        createBarChart(individualData);
        createBubbleChart(individualData);
        createGaugeChart(metadata);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }
  

// Initial function to load data and create the default chart
function init() {
  d3.json(dataURL)
    .then((data) => {
      const dropdown = d3.select("#selDataset");

      // Populate the dropdown with options
      dropdown
        .selectAll("option")
        .data(data.names)
        .enter()
        .append("option")
        .text((name) => name)
        .property("value", (name) => name);

      // Set a default option
      dropdown.property("value", data.names[0]);

      // Load and display data for the first individual
      optionChanged(data.names[0]);
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
}

// Initialize the web page
init();
