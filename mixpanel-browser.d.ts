declare module "mixpanel-browser" {
    export function init(token: string): void;

    export function track(event: string, parameters?: { [key: string]: string }): void;
}