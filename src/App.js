import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  CartesianGrid,
} from "recharts";
import Select from "react-select";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: null,
    topics: null,
    sector: null,
    region: null,
    pestle: null,
    source: null,
    swot: null,
    country: null,
    city: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://chart-backend-6g5j.onrender.com/all-users");
      setData(response.data.Allusers);
      setFilteredData(response.data.Allusers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getUniqueValues = (key) => {
    const uniqueValues = Array.from(new Set(data.map((item) => item[key])));
    return uniqueValues.map((value) => ({ value, label: value }));
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.endYear) {
      filtered = filtered.filter((item) => item.end_year === filters.endYear);
    }

    if (filters.topics) {
      filtered = filtered.filter((item) => item.topic === filters.topics.value);
    }

    if (filters.sector) {
      filtered = filtered.filter(
        (item) => item.sector === filters.sector.value
      );
    }

    if (filters.region) {
      filtered = filtered.filter(
        (item) => item.region === filters.region.value
      );
    }

    if (filters.pestle) {
      filtered = filtered.filter(
        (item) => item.pestle === filters.pestle.value
      );
    }

    if (filters.source) {
      filtered = filtered.filter(
        (item) => item.source === filters.source.value
      );
    }

    if (filters.swot) {
      filtered = filtered.filter((item) => item.swot === filters.swot.value);
    }

    if (filters.country) {
      filtered = filtered.filter(
        (item) => item.country === filters.country.value
      );
    }

    if (filters.city) {
      filtered = filtered.filter((item) => item.city === filters.city.value);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="dashboard container-fluid mt-4">
      <h1 className="mb-3">Insights Dashboard</h1>

      <div className="filters row">
        <div className="col-md-3">
          <Select
            className="filter-select"
            options={getUniqueValues("end_year")}
            onChange={(selectedOption) =>
              setFilters({ ...filters, endYear: selectedOption.value })
            }
            isClearable
            placeholder="Select End Year"
          />
        </div>

        <Select
          className="filter-select"
          options={getUniqueValues("topic")}
          onChange={(selectedOption) =>
            setFilters({ ...filters, topics: selectedOption })
          }
          isClearable
          placeholder="Select Topic"
        />

        <Select
          className="filter-select"
          options={getUniqueValues("sector")}
          onChange={(selectedOption) =>
            setFilters({ ...filters, sector: selectedOption })
          }
          isClearable
          placeholder="Select Sector"
        />

        <Select
          className="filter-select"
          options={getUniqueValues("region")}
          onChange={(selectedOption) =>
            setFilters({ ...filters, region: selectedOption })
          }
          isClearable
          placeholder="Select Region"
        />

        <Select
          className="filter-select"
          options={getUniqueValues("pestle")}
          onChange={(selectedOption) =>
            setFilters({ ...filters, pestle: selectedOption })
          }
          isClearable
          placeholder="Select PESTLE"
        />

        <Select
          className="filter-select"
          options={getUniqueValues("source")}
          onChange={(selectedOption) =>
            setFilters({ ...filters, source: selectedOption })
          }
          isClearable
          placeholder="Select Source"
        />

     

        <Select
          className="filter-select"
          options={getUniqueValues("country")}
          onChange={(selectedOption) =>
            setFilters({ ...filters, country: selectedOption })
          }
          isClearable
          placeholder="Select Country"
        />

       

        <div className="col-md-3 ">
          <button
            className="apply-button btn btn-success"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>

            <div className="row">
          {/* Intensity Trends Line Chart */}
          <div className="col-md-6">
            <div className="chart-container">
              <div className="chart-title">Intensity Trends</div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <XAxis dataKey="added" interval={"preserveStartEnd"} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Relevance Distribution Bar Chart */}
          <div className="col-md-6">
            <div className="chart-container">
              <div className="chart-title">Relevance Distribution</div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <XAxis dataKey="added" interval={"preserveStartEnd"} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="relevance" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Area Chart */}
          <div className="col-md-6">
            <div className="chart-container">
              <div className="chart-title">Area Chart</div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={filteredData}>
                  <XAxis dataKey="added" interval={"preserveStartEnd"} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="likelihood" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="col-md-6">
            <div className="chart-container">
              <div className="chart-title">Radar Chart</div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={filteredData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="title" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Likelihood"
                    dataKey="likelihood"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Scatter Chart */}
          <div className="col-md-6">
            <div className="chart-container">
              <div className="chart-title">Scatter Chart</div>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={filteredData}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="intensity" name="Intensity" />
                  <YAxis type="number" dataKey="likelihood" name="Likelihood" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter name="Data" dataKey="relevance" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
    </div>
  );
}

export default App;
