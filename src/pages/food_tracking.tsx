import Header from '../components/header';
import "./food_tracking.css"
const FoodTracking = () => {
    return (
        <>
        <Header />
        <div className="tracking-app">
            <h1>Tracking Page</h1>
            <p>This is the tracking page where you can monitor your progress.</p>
        </div></>
    );
}

export default FoodTracking;