import { Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  elements,
} from "chart.js";
import useIncomes from "../hooks/useIncomes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

let misoptions = {};

function LinesChart({ midata }) {
  const { incomes, setIncomes, error, loading } = useIncomes();

  return (
    <div className="charts-container">
      <Line data={midata} options={misoptions} />

      {/*  <div>
        <Line data={midata2} options={misoptions} />
      </div> */}
    </div>
  );
}

export default LinesChart;
