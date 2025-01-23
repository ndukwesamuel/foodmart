// utils/getInstalledVersion.js
import DeviceInfo from "react-native-device-info";
// utils/checkForUpdates.js
import axios from "axios";
import { getInstalledVersion } from "./getInstalledVersion";
import { Alert } from "react-native";

export const getInstalledVersion = async () => {
  try {
    const version = await DeviceInfo.getVersion();
    return version;
  } catch (error) {
    console.error("Error fetching installed version:", error);
  }
};

export const checkForUpdates = async (platform) => {
  try {
    // const installedVersion = await getInstalledVersion(); // Get the installed version
    // const versionUrl = platform === 'android'
    //   ? 'http://yourbackend.com/api/version/latest-version/android'
    //   : 'http://yourbackend.com/api/version/latest-version/ios'; // Choose platform-specific URL
    // const response = await axios.get(versionUrl); // Fetch the latest version from the backend
    // const latestVersion = response.data.latestVersion;
    // // Compare versions
    // if (installedVersion !== latestVersion) {
    //   Alert(A new version is available for ${platform === 'android' ? 'Android' : 'iOS'}! Please update the app.);
    //   // You can display a modal or redirect to the App Store/Play Store
    // }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
};
