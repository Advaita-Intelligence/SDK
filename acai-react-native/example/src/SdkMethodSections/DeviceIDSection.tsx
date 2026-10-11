import * as React from 'react';
import { Button, Input } from 'react-native-elements';
import { View } from 'react-native';
import { SdkSectionLayout } from './SdkSectionLayout';
import { useAcai } from '../utils/acai';

export const DeviceIDSection = () => {
  const acai = useAcai();
  const [currentDeviceId, setCurrentDeviceId] = React.useState<string | null>(
    '',
  );
  const [loading, updateLoading] = React.useState(true);

  const handleRegenerateDeviceId = () => {
    acai.regenerateDeviceId();
    updateLoading(true);
  };

  const getDeviceId = React.useCallback(async () => {
    const deviceId = await acai.getDeviceId();
    setCurrentDeviceId(deviceId);
    updateLoading(false);
  }, [acai]);

  React.useEffect(() => {
    if (loading) getDeviceId();
  }, [getDeviceId, loading]);

  return (
    <SdkSectionLayout heading={'Device ID'}>
      <View pointerEvents="none">
        <Input value={currentDeviceId ?? ''} editable={false} />
      </View>
      <Button
        title={'Regenerate Device ID'}
        onPress={handleRegenerateDeviceId}
      />
    </SdkSectionLayout>
  );
};
