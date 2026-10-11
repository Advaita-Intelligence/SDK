import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AcaiProvider } from './utils/acai';
import { AppHeader } from './AppHeader';
import {
  UserIDSection,
  DeviceIDSection,
  EventSection,
  IdentifySection,
  GroupAccountSection,
  GroupIdentifySection,
  FlushEventsSection,
  RevenueSection,
  SessionsSection,
} from './SdkMethodSections';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <AcaiProvider>
            <AppHeader />
            <UserIDSection />
            <DeviceIDSection />
            <EventSection />
            <IdentifySection />
            <GroupAccountSection />
            <GroupIdentifySection />
            <RevenueSection />
            <FlushEventsSection />
            <SessionsSection />
          </AcaiProvider>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
