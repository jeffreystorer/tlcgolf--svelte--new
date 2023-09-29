export async function load({url}){
    const id = url.searchParams.get("id");
    const gid = url.searchParams.get("gid");
    return { id, gid}
}