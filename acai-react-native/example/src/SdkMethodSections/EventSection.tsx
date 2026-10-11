import * as React from 'react';
import { Input, Button } from 'react-native-elements';
import { useAcai } from '../utils/acai';
import { StyleSheet } from 'react-native';

import { SdkSectionLayout } from './SdkSectionLayout';

export const EventSection = () => {
  const [eventName, setEventName] = React.useState<string>('');

  const acai = useAcai();

  return (
    <SdkSectionLayout heading={'Event'}>
      <Input
        placeholder={'Event Name'}
        value={eventName}
        onChangeText={setEventName}
        containerStyle={styles.inputContainer}
      />
      <Button
        style={styles.button}
        title={'Send Event'}
        disabled={!eventName}
        onPress={() => {
          acai.logEvent(eventName);
        }}
      />
    </SdkSectionLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '30%',
  },
  inputContainer: {
    marginLeft: -5,
  },
});
