import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useAcai } from '../utils/acai';

import { SdkSectionLayout } from './SdkSectionLayout';

export const UserIDSection = () => {
  const [userId, setUserId] = React.useState<string>('');

  const acai = useAcai();

  return (
    <SdkSectionLayout heading={'User ID'}>
      <Input
        placeholder={'Enter User ID'}
        onChangeText={setUserId}
        value={userId}
        containerStyle={styles.inputContainer}
      />
      <Button
        title="Set User ID"
        style={styles.button}
        disabled={!userId}
        onPress={() => {
          acai.setUserId(userId);
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
