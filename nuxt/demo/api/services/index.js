import axios  from "../request";
export function testApi (data) {
    return axios({
        method:"GET",
        params: data
    })
}

