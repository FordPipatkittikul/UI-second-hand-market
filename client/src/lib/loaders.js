import apiRequest from "./apiRequest"

/*
    getting response data from params and use it for single page
*/
export const singlePageLoader =  async ({request,params}) => {
    const res = await apiRequest("/posts/" + params.id)
    return res.data
}

export const listPageLoader = async ({request}) => {
    const res = await apiRequest("/posts");
    return res.data
}