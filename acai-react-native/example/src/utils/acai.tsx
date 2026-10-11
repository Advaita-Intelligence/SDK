import { Acai } from '@acai/react-native-sdk';
import React from 'react';

const initAcai = (): Acai => {
  const acaiInstance = Acai.getInstance();
  acaiInstance.init('YOUR_ACAI_API_KEY');
  acaiInstance.setEventUploadMaxBatchSize(200);
  acaiInstance.setEventUploadThreshold(30);
  acaiInstance.setEventUploadPeriodMillis(20000);
  acaiInstance.setPlan({
    branch: 'example-branch',
    source: 'example-source',
    version: '1.2.3',
    versionId: 'example-version-id',
  });
  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  iInstance.addEventMiddleware((  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  iInstance.addEventMiddleware((  acaiInst  acaiInst  acaiInnt  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  iInstance.addEventMiddleware((  acaiInst  acaiInst  acaiInstIn  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  acaiInstpo  acaiInst  acaiInst  acaiInst  acaiInst  acaiInst  t.  acaiInst  aciI  acaiInst  acaiInst  acaiInst  acaiInsro  acaiInst  acaiInst  acaiInst  acaiInst  acapp  acaiInst  acaiInst  ase useAcai',
    );
  }

  return ac  return ac  return ac  return ac  returnchildren,
}: React.PropsWithChildren<{}>): R}: React.PropsWithChildren<{}>): R}: React.Pr.Provider value={acaiInstance}>
    {children}
  </AcaiInstanceContext.Provider>
);
