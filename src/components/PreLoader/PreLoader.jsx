import "./PreLoader.scss";
import { CircularProgress } from "@mui/material";

const PreLoader = () => {
    return (
        <div className="app__loading">
            <div className="m-auto">
                <CircularProgress color="success" size={65} />

            </div>
        </div>
    );
};

export default PreLoader;
