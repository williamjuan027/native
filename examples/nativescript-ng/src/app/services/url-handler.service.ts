export interface StorybookUrl {
    url: string,
    params?: Record<string, any>
}
export class UrlHandlerService {
     
    parseUrl(url: string): StorybookUrl {
        // example url: sb-native://deep.link?component=button&label=helo
        const urlWithParams = url.indexOf('?') !== -1
        if (urlWithParams) {
            const params = {};
            const parameters = url.substring(url.indexOf('?') + 1).split('&');
            parameters.forEach(parameter => {
                const [parameterKey, parameterValue] = parameter.split('=');
                params[parameterKey] = decodeURI(parameterValue);
            })
            return {
                url: url,
                params: params
            }
        }
        return {
            url: url
        }
    }

    private urlHandlerCallback;
    handleOpenURL(handler: (url: StorybookUrl) => void): void {
        this.urlHandlerCallback = handler;
    }
    
    getCallback(): (url: StorybookUrl) => void {
        if (!this.urlHandlerCallback) {
            this.urlHandlerCallback = function () {
                console.error('No callback provided. Please ensure that you called "handleOpenURL" during application init!');
            };
        }
        return this.urlHandlerCallback;
    }

    private static _instance: UrlHandlerService = new UrlHandlerService()
    static getInstance(): UrlHandlerService {
        return UrlHandlerService._instance
    }
}