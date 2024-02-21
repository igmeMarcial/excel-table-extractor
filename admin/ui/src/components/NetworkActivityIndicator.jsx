import { useAppSelector } from "../app/hooks";
import { ProgressBar } from "@fluentui/react-components";
import { selectActiveNetworkActivity } from "../app/AppSlice";
const NetworkActivityIndicator = () => {
  const activeNetworkActivity = useAppSelector(selectActiveNetworkActivity);
  return (
    <div style={{ height: "4px", backgroundColor: "#f0f0f0" }}>
      {activeNetworkActivity && (
        <div
          style={{
            height: "100%",
            backgroundColor: "#CFE4FA",
          }}
        >
          <ProgressBar thickness="large" shape="squre" />
        </div>
      )}
    </div>
  );
};

export default NetworkActivityIndicator;
