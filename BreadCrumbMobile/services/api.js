import axios from "axios";

// Android Emulator
// const API_URL = "http://10.0.2.2:5000/api";

// Physical Phone
// const API_URL = "http://YOUR_COMPUTER_IP:5000/api";

// Expo Web
const API_URL = "http://10.0.50.118:5000/api";

export default axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});