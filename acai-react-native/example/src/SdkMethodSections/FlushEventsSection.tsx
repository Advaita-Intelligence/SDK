import * as React from 'react';
import { Button } from 'react-native-elements';
import { useAcai } from '../utils/acai';

import { SdkSectionLayout } from './SdkSectionLayout';

export const FlushEventsSection = () => {
  const acai = useAcai();

  return (
    <SdkSectionLayout heading={'Flush Events'}>
      <Button
        title={'Click to Flush Events'}
        onPress={() => {
          acai.uploadEvents();
        }}
      />
    </SdkSectionLayout>
  );
};
