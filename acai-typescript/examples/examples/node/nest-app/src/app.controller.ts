import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as acai from '@acai/analytics-node';

const ACAI_API_KEY = '9f0e4a9f1c1233088b254e30ba3c80e1';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    acai.init(ACAI_API_KEY, {
      logLevel: acai.Types.LogLevel.Debug,
    });
  }

  @Get()
  @Render('index')
  getOptions(): any {
    return this.appService.getOptions();
  }

  @Get('track')
  async track(): Promise<string> {
    await acai.track(
      'nest-app example event',
      { property1: '1' },
      { user_id: 'test_user' },
    ).promise;
    return 'Triggered, check console output...';
  }

  @Get('identify')
  async identify(): Promise<string> {
    const identifyObj = new acai.Identify();
    identifyObj.set('email', 'test_user@email.com');
    identifyObj.set('role', 'test');
    await acai.identify(identifyObj, { user_id: 'test_user' }).promise;
    return 'Triggered, check console output...';
  }

  @Get('group')
  async group(): Promise<string> {
    await acai.setGroup('org', 'engineering', { user_id: 'test_user' })
      .promise;
    return 'Triggered, check console output...';
  }

  @Get('group-identify')
  async groupIdentify(): Promise<string> {
    await acai.groupIdentify(
      'org',
      'engineering',
      new acai.Identify().set('technology', 'nest.js'),
      { user_id: 'test_user' },
    ).promise;
    return 'Triggered, check console output...';
  }

  @Get('test')
  async test(): Promise<string> {
    const identifyObj = new acai.Identify();
    identifyObj.set('email', 'marvin@test.com');
    identifyObj.set('env', 'dev');
    acai.identify(identifyObj);

    acai.track('some event', undefined, { user_id: 'marvin' });
    await acai.flush().promise;
    return 'Triggered, check console output...';
  }
}
