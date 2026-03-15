#import "AcaiFlutterPlugin.h"
#import <acai_flutter/acai_flutter-Swift.h>

@implementation AcaiFlutterPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  [SwiftAcaiFlutterPlugin registerWithRegistrar:registrar];
}
@end
