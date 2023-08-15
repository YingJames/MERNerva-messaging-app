import { Loading } from "@carbon/react";

const LoadingScreen = () => {
    const loadingWrapper = {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center",

        "position": "fixed",
        "left": "0px",
        "top": "0px",
        "width": "100%",
        "height": "100%",
        "zIndex": "9999",
    }

    return (
        <div style={loadingWrapper}>
            <Loading
                description="Active loading indicator"
                withOverlay={false} />
        </div>
    );
}
export default LoadingScreen;