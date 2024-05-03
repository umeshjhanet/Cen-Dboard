import React, { useEffect, useState, useRef } from "react";
import { CCard, CCardBody, CCol, CCardHeader, CRow } from "@coreui/react";
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from "@coreui/react-chartjs";
import Header from "./Components/Header";
import axios, { all } from "axios";
import "./App.css";
import Footer from "./Footer";
import { BarChart } from "@mui/x-charts/BarChart";
import { format, sub } from "date-fns";
import { MdFileDownload } from "react-icons/md";

const DistrictHeadDashboard = () => {
    const [data2, setData2] = useState();
  const currentDate = new Date();
  const yesterdayDate = sub(currentDate, { days: 1 });
  const previousDate = sub(currentDate, { days: 2 });
  const formattedCurrentDate = format(currentDate, "dd-MM-yyyy");
  const formattedYesterdayDate = format(yesterdayDate, "dd-MM-yyyy");
  const formattedPreviousDate = format(previousDate, "dd-MM-yyyy");
  const [tableData, setTableData] = useState([]);
  const [csv, setCsv] = useState(null);
  const dropdownRef = useRef(null);
  const [showLocation, setShowLocation] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  
  const userLog = JSON.parse(localStorage.getItem("user"));
  console.log("User's Info", userLog);

  const [monthImage, setMonthImage] = useState({
    labels: [],
    datasets: [
      {
        label: "No. of Images",
        backgroundColor: "#f87979",
        data: [],
      },
    ],
  });
  const [allLocationImage, setAllLocationImage] = useState({
    labels: [],
    datasets: [
      {
        label: "No. of Images",
        backgroundColor: "#f87979",
        data: [],
      },
    ],
  });
  
  const [scannedData, setScannedData] = useState(null);
  const [locationReportData, setLocationReportData] = useState({
    labels: [],
    datasets: [
      {
        label: "Scanning",
        backgroundColor: "#02B2AF",
        data: [],
      },
    ],
  });
  const random = () => Math.round(Math.random() * 100);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLocation(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  // const handleLocation = (locationName) => {
  //   if (!selectedLocations.includes(locationName)) {
  //     setSelectedLocations([...selectedLocations, locationName]);
  //     setSearchInput("");
      
  //   }
  //   setShowLocation(false); 
  // };
  // const handleLocation = (locationName) => {
  //   if (!selectedLocations.includes(locationName)) {
  //     setSelectedLocations([...selectedLocations, locationName]);
  //   } else {
  //     setSelectedLocations(selectedLocations.filter(loc => loc !== locationName));
  //   }
  //   setSearchInput(""); // Clear search input
  // };

  const handleLocation = (locationName) => {
    setSearchInput(""); // Clear search input
  };
  const removeLocation = (locationName) => {
    setSelectedLocations(
      selectedLocations.filter((loc) => loc !== locationName)
    );
  };
  const toggleCheckbox = (locationName) => {
    setSelectedCheckboxes({
      ...selectedCheckboxes,
      [locationName]: !selectedCheckboxes[locationName]
    });
  };
  
  const handleLocationCheckbox = (locationName) => {
    if (!selectedLocations.includes(locationName)) {
      setSelectedLocations([...selectedLocations, locationName]);
    } else {
      setSelectedLocations(selectedLocations.filter(loc => loc !== locationName));
    }
  };
  

  // Function to render checkboxes for locations
  const renderCheckboxes = () => {
    return tableData.map((item, index) => (
      <div key={index}>
        <input
          type="checkbox"
          checked={selectedCheckboxes[item.LocationName]}
          onChange={() => toggleCheckbox(item.LocationName)}
        />
        <label onClick={() => handleLocation(item.LocationName)}>
          {item.LocationName}
        </label>
      </div>
    ));
  };

  const handleExport = () => {
    setShowConfirmation(true);
  };

  const handleConfirmedExport = () => {
    if (csv) {
      const link = document.createElement("a");
      link.href = csv;
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setShowConfirmation(false);
  };

  const handleCancelExport = () => {
    setShowConfirmation(false);
  };

  // const handleExport = () => {
  //   if (csv) {
  //     const link = document.createElement("a");
  //     link.href = csv;
  //     link.setAttribute("download", "export.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };

  const calculateColumnSum = () => {
    let prevFilesSum = 0;
    let prevImagesSum = 0;
    let yesFilesSum = 0;
    let yesImagesSum = 0;
    let todayFilesSum = 0;
    let todayImagesSum = 0;
    let totalFilesSum = 0;
    let totalImagesSum = 0;

    tableData.forEach((elem) => {
      if (
        selectedLocations.length === 0 ||
        selectedLocations.includes(elem.LocationName)
      ) {
        prevFilesSum += parseInt(elem.Prev_Files) || 0;
        prevImagesSum += parseInt(elem.Prev_Images) || 0;
        yesFilesSum += parseInt(elem.Yes_Files) || 0;
        yesImagesSum += parseInt(elem.Yes_Images) || 0;
        todayFilesSum += parseInt(elem.Today_Files) || 0;
        todayImagesSum += parseInt(elem.Today_Images) || 0;
        totalFilesSum += parseInt(elem.Total_Files) || 0;
        totalImagesSum += parseInt(elem.Total_Images) || 0;
      }
    });

    return {
      prevFilesSum,
      prevImagesSum,
      yesFilesSum,
      yesImagesSum,
      todayFilesSum,
      todayImagesSum,
      totalFilesSum,
      totalImagesSum,
    };
  };
    useEffect(() => {
        const fetchLocationData = async () => {
          if (selectedLocations.length > 0) {
            try {
              setIsLoading(true);
              const locationDataResponses = await Promise.all(
                selectedLocations.map((location) =>
                  axios.get(
                    `http://localhost:5000/api/locationwisetabularData?locationName=?`
                  )
                )
              );
              const locationData = locationDataResponses.map(
                (response) => response.data
              );
              setLocationData(locationData);
              console.log("agra", locationData);
              setIsLoading(false);
            } catch (error) {
              console.error("Error fetching location data:", error);
              setError("Error fetching location data. Please try again.");
              setIsLoading(false);
            }
          }
        };
        const locationName = selectedLocations;
    
        const fetchExportCsvFile = () => {
          // Construct the API URL with multiple location names
          const apiUrl = locationName
            ? `http://localhost:5000/csv?${locationName
                .map((name) => `locationName=${name}`)
                .join("&")}`
            : "http://localhost:5000/csv";
    
          axios
            .get(apiUrl, { responseType: "blob" })
            .then((response) => {
              const blob = new Blob([response.data], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              setCsv(url);
              console.log("CSV");
            })
            .catch((error) => {
              console.error("Error in exporting data:", error);
            });
        };
    
        const fetchMonthImageGraphData = () => {
          const params = {
            params: {
              locationNames: selectedLocations, // Assuming selectedLocations is an array of location names
            },
          };
          axios
            .get("http://localhost:5000/graphmonth", params)
            .then((response) => {
              const apiData = response.data;
              const labels = apiData.map((item) => item["scandate"]);
              const data = apiData.map((item) => item["Scanned No Of Images"]);
              console.log("lables", labels);
              console.log("images", data);
              setMonthImage({
                labels: labels.filter((label) => label !== "id"),
                datasets: [
                  {
                    ...monthImage.datasets[0],
                    data: data,
                  },
                ],
              });
              console.log("Monthly  data fetch", monthImage);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        };
       
        const fetchTableData = () => {
          axios
            .get("http://localhost:5000/tabularData")
            .then((response) => {
              setTableData(response.data);
              console.log("Table Data", response.data); // Log inside the then block
            })
            .catch((error) => console.error(error));
        };

        const fetchAllGraphImageData = (selectedLocations) => {
            let apiUrl = "http://localhost:5000/graph10";
      
            if (selectedLocations && selectedLocations.length > 0) {
              const locationQuery = selectedLocations
                .map((location) => `locationname=${encodeURIComponent(location)}`)
                .join("&");
              apiUrl += `?${locationQuery}`;
            }
      
            axios
              .get(apiUrl)
              .then((response) => {
                const apiData = response.data;
                if (!apiData || apiData.length === 0) {
                  console.error("No data received from the API");
                  return;
                }
                const labels = apiData.map((item) => item["Location Name"]);
                const data = apiData.map((item) => item["Images"]);
                console.log("TodayLabels:", labels);
                console.log("TodayData:", data);
                setAllLocationImage({
                  labels: labels,
                  datasets: [
                    {
                      label: "No. of Images",
                      data: data,
                      backgroundColor: "#02B2AF",
                    },
                  ],
                });
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          };
    
        
        fetchMonthImageGraphData(locationName);
        fetchAllGraphImageData(locationName);
        fetchTableData();
        fetchExportCsvFile();
    
      }, [selectedLocations]);
    
      
      const columnSums = calculateColumnSum();

      const handleSearch = () => {
        // Filter table data based on search input
        const filteredData = tableData.filter((elem) => {
          const locationMatchesSearch = elem.LocationName.toLowerCase().includes(searchInput.toLowerCase());
          if (selectedLocations.length === 0) {
            // If no locations are selected, include all locations
            return locationMatchesSearch;
          } else {
            // If locations are selected, include only selected locations
            return selectedLocations.includes(elem.LocationName) && locationMatchesSearch;
          }
        });
        setTableData(filteredData);
      };
       

      const isDistrictHeadUser =
    userLog && userLog.user_roles.includes("All District Head");
    return (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2 col-md-2 "></div>
              <div className="col-lg-10 col-md-10">
                <div className="row">
                  <p
                    className="mt-1 fw-bold"
                    style={{ color: "#4BC0C0", fontSize: "20px" }}
                  >
                    Dashboard
                  </p>
                  {/* <p style={{ fontSize: '16px', marginTop:'-15px' }}>Telangana Dashboard Welcomes You  last Active Login: {userLog ? userLog.last_active_login : 'Guest'}</p> */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p style={{ fontSize: "16px" }}>
                      Telangana Dashboard Welcomes You
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        marginTop: "-15px",
                        textAlign: "right",
                      }}
                    >
                      Last Active Login:{" "}
                      {userLog ? userLog.last_active_login : "Guest"}
                    </p>
                  </div>
                </div>
                <div className="row  mt-2  search-report-card">
                  <div className="col-md-4 col-sm-12">
                    <div
                      ref={dropdownRef}
                      className="search-bar mt-1"
                      style={{
                        border: "1px solid #000",
                        padding: "5px",
                        borderRadius: "5px",
                        minHeight: "30px",
                      }}
                      contentEditable={true}
                      onClick={() => setShowLocation(!showLocation)}
                    >
                      {selectedLocations.map((location, index) => (
                        <span key={index} className="selected-location">
                          {location}
                          <button
                            onClick={() => removeLocation(location)}
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              border: "none",
                              marginLeft: "5px",
                            }}
                          >
                            x
                          </button>
                          &nbsp;
                        </span>
                      ))}
                      <span style={{ minWidth: "5px", display: "inline-block" }}>
                        &#8203;
                      </span>
                    </div>
                    {showLocation && (
                      <>
                        <div className="location-card">
                        {renderCheckboxes()}
                          {tableData &&
                            tableData.map((item, index) => (
                              <div key={index}>
                                <p
                                  onClick={() =>
                                    handleLocation(item.LocationName)
                                  }
                                >
                                  {item.LocationName}
                                </p>
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
  
                  <div className="col-md-2 col-sm-12">
                    <button className="btn search-btn" onClick={handleSearch}>Search</button>
                  </div>
  
                  <div className="col-md-6"></div>
                </div>
                <div className="row mt-2">
                  <div className="card">
                    <h4 className="ms-1">SCANNING REPORT OF LAST 30 DAYS</h4>
                    <h5 className="ms-1">All Location: Images</h5>
                    <CCard>
                      <CCardBody>
                        <CChartBar data={monthImage} labels="months" />
                      </CCardBody>
                    </CCard>
                    <div>
                      {scannedData && (
                        <BarChart
                          className="scanned-chart"
                          xAxis={scannedData.xAxis}
                          series={scannedData.series}
                          width={scannedData.width}
                          height={scannedData.height}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="table-card">
                    <div
                      className="row"
                      style={{
                        padding: "5px",
                        backgroundColor: "#4BC0C0",
                        paddingTop: "15px",
                      }}
                    >
                      <div className="col-10">
                        <h6 className="text-center" style={{ color: "white" }}>
                          PROJECT UPDATE OF SCANNING AND DIGITIZATION OF CASE
                          RECORDS FOR DISTRICT COURT OF UTTAR PRADESH
                        </h6>
                      </div>
                      <div className="col-2">
                        <h6 style={{ color: "white" }} onClick={handleExport}>
                          {" "}
                          <MdFileDownload style={{ fontSize: "20px" }} />
                          Export CSV
                        </h6>
                      </div>
                      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p className="fw-bold">Are you sure you want to export the CSV file?</p>
            <button className="btn btn-success mt-3 ms-5" onClick={handleConfirmedExport}>Yes</button>
            <button className="btn btn-danger ms-3 mt-3" onClick={handleCancelExport}>No</button>
          </div>
        </div>
      )}
                    </div>
                    <div
                      className="row mt-5 ms-2 me-2"
                      style={{ overflowX: "auto" }}
                    >
                      <table class="table table-hover table-bordered table-responsive data-table">
                        <thead style={{ color: "#4BC0C0" }}>
                          <tr>
                            <th rowspan="2">Sr. No.</th>
                            <th rowspan="2">Location</th>
                            <th colspan="2">Scanned ({formattedPreviousDate})</th>
                            <th colspan="2">
                              Scanned ({formattedYesterdayDate})
                            </th>
                            <th colspan="2">Scanned ({formattedCurrentDate})</th>
                            <th colspan="2">Cumulative till date</th>
                            <th rowspan="2">Remarks</th>
                          </tr>
                          <tr>
                            <th>Files</th>
                            <th>Images</th>
                            <th>Files</th>
                            <th>Images</th>
                            <th>Files</th>
                            <th>Images</th>
                            <th>Files</th>
                            <th>Images</th>
                          </tr>
                        </thead>
  
                        <tbody style={{ color: "gray" }}>
                          {tableData &&
                            tableData.map((elem, index) => {
                              if (
                                selectedLocations.length === 0 ||
                                selectedLocations.includes(elem.LocationName)
                              ) {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{elem.LocationName}</td>
                                    <td>{elem.Prev_Files || "0"}</td>
                                    <td>{elem.Prev_Images || "0"}</td>
                                    <td>{elem.Yes_Files || "0"}</td>
                                    <td>{elem.Yes_Images || "0"}</td>
                                    <td>{elem.Today_Files || "0"}</td>
                                    <td>{elem.Today_Images || "0"}</td>
                                    <td>{elem.Total_Files || "0"}</td>
                                    <td>{elem.Total_Images || "0"}</td>
                                    <td></td>
                                  </tr>
                                );
                              }
                              return null;
                            })}
  
                          <tr style={{ color: "black" }}>
                            <td colspan="2">
                              <strong>Total</strong>
                            </td>
  
                            <td>
                              <strong>{columnSums.prevFilesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.prevImagesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.yesFilesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.yesImagesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.todayFilesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.todayImagesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.totalFilesSum}</strong>
                            </td>
                            <td>
                              <strong>{columnSums.totalImagesSum}</strong>
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
  
                <div className="row mt-2">
                  <CCard>
                    <h4 className="ms-1">CUMULATIVE SCANNED TILL DATE</h4>
                    <h5 className="ms-1">All Location: Images</h5>
                    <CCardBody>
                      <CChartBar
                        data={allLocationImage}
                        labels="months"
                      ></CChartBar>
                    </CCardBody>
                  </CCard>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </>
      );
}

export default DistrictHeadDashboard