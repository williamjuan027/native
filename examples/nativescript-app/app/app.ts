/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application, isIOS } from '@nativescript/core'
import { UrlHandlerService } from './services/url-handler.service';

if (isIOS) {
    @NativeClass()
    class UIApplicationDelegateImpl
      extends UIResponder
      implements UIApplicationDelegate
    {
      public static ObjCProtocols = [UIApplicationDelegate];
    }
    Application.ios.delegate = UIApplicationDelegateImpl;
    
    const appDelegate = Application.ios.delegate;


    function enableMultipleOverridesFor(classRef, methodName, nextImplementation) {
        const currentImplementation = classRef.prototype[methodName];
        classRef.prototype[methodName] = function () {
            const result = currentImplementation && currentImplementation.apply(currentImplementation, Array.from(arguments));
            return nextImplementation.apply(nextImplementation, Array.from(arguments).concat([result]));
        };
    }

    enableMultipleOverridesFor(
        appDelegate,
        'applicationOpenURLOptions',
        function (
            application: UIApplication,
            url: NSURL,
            options: any
        ): boolean {
            const lastArgument = arguments[arguments.length - 1];
            const previousResult = lastArgument !== options ? lastArgument : undefined;

            if (!previousResult) {
                const parsedUrl = UrlHandlerService.getInstance().parseUrl(url.absoluteString);
                UrlHandlerService.getInstance().getCallback()(parsedUrl);
                return true;
            }

            return previousResult;
        });

    // enableMultipleOverridesFor(
    //     appDelegate,
    //     'applicationContinueUserActivityRestorationHandler',
    //     function (
    //         application: UIApplication,
    //         userActivity: NSUserActivity
    //     ): boolean {
    //         if (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {
    //         }

    //         return true;
    // });

    
}


Application.run({ moduleName: 'app-root' })

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
