
export type GenericObject = { [prop: string]: any };

export type RequestResponseHeaders = {
    header: string;
    operation: 'set' | 'remove' | 'append';
    value?: string;
};

// Redirection component
export interface Rule {
    id?: number;
    priority: number;
    action: {
        type: 'redirect' | 'modifyHeaders';
        redirect?: { url: string };
        requestHeaders?: RequestResponseHeaders[];
        responseHeaders?: RequestResponseHeaders[];
    };
    condition: { urlFilter: string; resourceTypes: string[] };
}
