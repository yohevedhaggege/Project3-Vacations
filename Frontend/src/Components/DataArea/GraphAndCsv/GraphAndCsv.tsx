
import React, { useEffect, useState } from "react";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, } from "chart.js";
import { Bar } from "react-chartjs-2";
import VacationModel from "../../../Models/VacationModel";
import userAdminService from "../../../Services/UserAdminService";
import notifyService from "../../../Services/NotifyService";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { authStore } from "../../../Redux/AuthState";
import useVerifyAdmin from "../../../Utils/useVerifyAdmin";
import "./GraphAndCsv.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function FollowersGraph(): JSX.Element {

    useVerifyLoggedIn();
    useVerifyAdmin();

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Define the chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                display: false,
            },
            title: {
                display: true,
                text: "Vacation Report",
                color: "black",
                font: {
                    size: 30,
                    weight: "bold",
               },
            }
        },
        scales: {
            y: {
                ticks: {

                    color: "black",
                    stepSize: 1,
                    beginAtZero: true,
                },
            },
            x: {
                ticks: {

                    color: "black",
                    stepSize: 1,
                    beginAtZero: true,
                },
            },
        },
    };


    //to fetch vacations 
    useEffect(() => {

        const userId = authStore.getState().user.userId;

        userAdminService
            .getAllVacations(userId)
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));
    }, []);


    // Define the data for the chart
    const data = {
        labels: vacations
            .filter((v) => v.followersCount > 0)
            .map((v) => v.destination),
        datasets: [
            {
                label: "Followers",
                data: vacations
                    .filter((v) => v.followersCount > 0)
                    .map((v) => v.followersCount),
                backgroundColor: "turquoise",
            },
        ],
    };


    // Create CSV data from the chart data
    const csvData = vacations
        .filter((v) => v.followersCount > 0)
        .map((v) => ({
            Destination: v.destination,
            Followers: v.followersCount,
        }));

    return (

        <div>
            <div className="FileCSV">
                {/* Create a CSV link with the generated CSV data */}

                <CSVLink
                    className="csv-download-link"
                    data={csvData}
                    filename={"Vacation_Followers.csv"}
                >

                    Download CSV File
                    <FileDownloadIcon />
                </CSVLink>

            </div>
            {/* Render the Bar chart with the specified options and data */}

            <br></br>
            <Bar options={options} data={data} />

        </div>
    );
}

export default FollowersGraph;
