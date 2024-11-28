// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Set login as the first screen */}
      <Stack.Screen name="login" options={{ headerShown: false }} /> 
      <Stack.Screen name="otp" options={{ headerShown: false }} /> 
      <Stack.Screen name="personalinfo" options={{ headerShown: false }} /> 
      <Stack.Screen name="wellnessinfo" options={{ headerShown: false }} /> 
      <Stack.Screen name="labreports" options={{ headerShown: false }} /> 
      <Stack.Screen name="familyplan" options={{ headerShown: false }} /> 
      <Stack.Screen name="familyjoin" options={{ headerShown: false }} /> 
      <Stack.Screen name="joinyourfamily" options={{ headerShown: false }} /> 
      <Stack.Screen name="joinwithcode" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
      <Stack.Screen name="404" options={{ title: 'Page Not Found' }} /> 
    </Stack>
  );
}
