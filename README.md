
# Health Connect and Food Logs Integration Guide

This guide will help you set up and test the integrations for Health Connect (Android and Apple Health) and Food Logs/Food Images using the relevant repositories.

1. Health Connect Integration (Android and Apple Health)

# Prerequisites:
- Ensure you have the appropriate Android or iOS device/emulator set up.
- Install [pnpm](https://pnpm.io/installation) for managing the project dependencies.

# Setup Instructions:
1. **Clone the Repository:**
   Begin by downloading the repository that contains the Health Connect integration. You can do this by cloning the repository from the appropriate source.
   
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   Run the following command to install the necessary dependencies:
   
   ```bash
   pnpm install
   ```

3. **Running the Application:**
   To run the Android application, execute the following command:
   
   ```bash
   pnpm android
   ```
   Alternatively, to run the Expo-based Android app, use:
   
   ```bash
   pnpm expo run:android
   ```

4. **Testing Health Connect Integration:**
   - Navigate to the `utils` folder under `native`.
   - Import the functions from the respective files:
     - `android-health-connect.ts`
     - `apple-health.ts`
   
   - Call the functions in your code. These functions will request permission from the user and, once granted, will fetch and log health-related data to the console.

5. **Expected Behavior:**
   - The functions will prompt for necessary permissions to access health data.
   - Upon successful permission, the data will be retrieved and printed to the console for you to verify.

---

# 2. Food Logs and Food Images Integration

# Prerequisites:
- Ensure your environment is ready with both the frontend and backend repositories.
- You will need to have Python installed to run the backend.

# Setup Instructions:

# Frontend Setup:

1. **Clone the Frontend Repository:**
   Download the same repository as in the Health Connect integration (if not already done).
   
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   Install the dependencies as before:
   
   ```bash
   pnpm install
   ```

3. **Running the Application:**
   To run the Android application, use the following command:
   
   ```bash
   pnpm android
   ```
   Or use the Expo command:
   
   ```bash
   pnpm expo run:android
   ```

4. **Testing Food Logs:**
   - In the app, navigate to the section where you can upload photos and input food logs.
   - Upload a food image and enter the respective log.

# Backend Setup:

1. **Clone the Backend Repository (Super Agent):**
   Now, clone the repository for the backend, which integrates with the food logging system.
   
   ```bash
   git clone <super-agent-repository-url>
   cd <super-agent-directory>
   ```

2. **Set up Virtual Environment:**
   - Set up a virtual environment in Python and activate it.
   ```bash
   python -m venv
   source venv/bin/activate
   ```

3. **Run the Backend:**
   Install the necessary dependencies and run the backend server.
   
   ```bash
   pip install -r requirements.txt
   python main.py
   ```

4. **IP Address Configuration:**
   - On the frontend code, update the IP address to your local machine's IPv4 address (the IP address of the network your device is connected to).
   - Ensure this IP address matches the Wi-Fi network of the device running the Android application.

5. **Expected Behavior:**
   - Once the app and backend are connected via the correct IP address, you should be able to upload food images and logs successfully.
   - The backend will process the information, and you will see the corresponding output based on the food data received.

