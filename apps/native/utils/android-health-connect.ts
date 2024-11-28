import { useCallback, useEffect, useState } from "react";
import {
  initialize,
  requestPermission,
  ReadRecordsOptions as NativeReadRecordsOptions,
  aggregateRecord,
  AggregateResultRecordType as NativeAggregateResultRecordType,
  AggregateResult,
} from "react-native-health-connect";

// Export the necessary types
export type ReadRecordsOptions = NativeReadRecordsOptions;
export type AggregateResultRecordType = NativeAggregateResultRecordType;

export function useReadHealthConnect(
  recordType: AggregateResultRecordType,
  options: ReadRecordsOptions
) {
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState<boolean>(false);
  const [data, setData] = useState<AggregateResult<typeof recordType>>();

  const main = useCallback(async () => {
    setLoading(true);
    await initialize();

    const grantedPermissions = await requestPermission([
      { accessType: "read", recordType },
    ]);

    // Check if permissions are granted
    if (grantedPermissions.length === 0) {
      setPermission(false);
      return;
    } else {
      setPermission(true);
    }

    const fetchedData = await aggregateRecord({ recordType, ...options });
    setData(fetchedData);
    setLoading(false);
  }, []);

  useEffect(() => {
    main();
  }, []);

  return { loading, permissionAvailable: permission, data, refetch: main };
}
