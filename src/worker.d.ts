interface Env {
    CAMPAIGN_BUCKET: R2Bucket;
    ASSETS: Fetcher;
}
declare const _default: {
    fetch(request: Request, env: Env): Promise<Response>;
};
export default _default;
