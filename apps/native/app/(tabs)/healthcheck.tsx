import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import {
  useReadHealthConnect,
  AggregateResultRecordType,
  ReadRecordsOptions,
} from '../../utils/android-health-connect'; // Adjust the path as needed

// Define record types for steps and calories
const recordTypes: AggregateResultRecordType[] = [
  "ActiveCaloriesBurned", // Active Calories Burned
  "Steps",                // Step count
];

// Options for time range
const options: ReadRecordsOptions = {
  timeRangeFilter: {
    operator: 'between',
    startTime: new Date(2021, 0, 1).toISOString(),
    endTime: new Date(2023, 0, 1).toISOString(),
  },
};

const HealthConnectComponent = () => {
  // Fetch for Active Calories
  const { loading: caloriesLoading, data: caloriesData, permissionAvailable: caloriesPermission } = useReadHealthConnect("ActiveCaloriesBurned", options);

  // Fetch for Steps
  const { loading: stepsLoading, data: stepsData, permissionAvailable: stepsPermission } = useReadHealthConnect("Steps", options);

  useEffect(() => {
    if (!caloriesLoading && caloriesData) {
      console.log('Active Calories Data:', caloriesData);
    }
    if (!stepsLoading && stepsData) {
      console.log('Steps Data:', stepsData);
    }
  }, [caloriesLoading, stepsLoading, caloriesData, stepsData]);

  useEffect(() => {
    // Check for permissions and log if they are not granted
    if (!caloriesPermission) {
      console.warn("Calories permission not granted");
    }
    if (!stepsPermission) {
      console.warn("Steps permission not granted");
    }
  }, [caloriesPermission, stepsPermission]);

  return (
    <View>
      {caloriesLoading ? (
        <Text>Loading active calories data...</Text>
      ) : (
        <Text>Active calories data loaded.</Text>
      )}

      {stepsLoading ? (
        <Text>Loading step count data...</Text>
      ) : (
        <Text>Step count data loaded.</Text>
      )}
    </View>
  );
};

export default HealthConnectComponent;
