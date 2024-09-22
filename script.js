// Variables for face detection and reminders
let faceDetectionModel;
let video;
let distanceThreshold = 30; // Example threshold in cm
let reminders = [
    { time: 60000, message: "Time to drink water!", color: "blue" },
    { time: 120000, message: "Time to stretch!", color: "green" },
    { time: 180000, message: "Look away from the screen!", color: "red" },
];

// Load the face detection model
async function loadFaceModel() {
    faceDetectionModel = await blazeface.load();
    console.log("Face detection model loaded.");
}

// Start video stream
async function startVideo() {
    video = document.createElement('video');
    video.width = 640;
    video.height = 480;

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    });
    video.srcObject = stream;
    video.play();
    document.body.append(video);
}

// Function to detect face and monitor distance
async function detectFace() {
    const predictions = await faceDetectionModel.estimateFaces(video, false);
    if (predictions.length > 0) {
        console.log('Face Detected');
        // Logic for checking distance and applying effects
        const distance = calculateDistance(predictions);
        if (distance < distanceThreshold) {
            alert("You are too close to the screen!");
        }
    }
    requestAnimationFrame(detectFace);
}

// Calculate distance (mock function for demo)
function calculateDistance(predictions) {
    // Logic to calculate the distance based on predictions
    return Math.random() * 100; // Placeholder for actual distance calculation
}

// Set reminders based on user input
function startReminders() {
    reminders.forEach(reminder => {
        setTimeout(() => {
            const dot = document.querySelector(`.dot.${reminder.color}`);
            dot.classList.add('blink');
            console.log(reminder.message);
            setTimeout(() => dot.classList.remove('blink'), 5000);
        }, reminder.time);
    });
}

// Event listeners
document.getElementById("startBtn").addEventListener("click", () => {
    loadFaceModel().then(startVideo);
    startReminders();
});

document.getElementById("setReminders").addEventListener("click", startReminders);

// Function to find nearby workers
document.getElementById("findNearbyBtn").addEventListener("click", () => {
    // Mock implementation for finding nearby workers
    console.log("Finding nearby remote workers...");
});

// Initialize map
function initMap() {
    // Placeholder for map initialization
    const mapContainer = document.getElementById('map');
    mapContainer.innerHTML = "Map would be initialized here.";
}

// Call initMap
initMap();
