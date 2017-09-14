import * as mixpanel from "mixpanel-browser";

let token = "7ab7815e830c8dbe458296b30465b7da";

if (window.location.hostname === "gribbet.github.io")
    token = "0f7b50ed2b090ae369958d2398f93a2f";

mixpanel.init(token);

track("Load", { "path": window.location.pathname });

export function track(event: string, parameters: { [key: string]: string } = {}) {
    mixpanel.track(event, parameters);
}
