export default {
    state: {
        lang: "zh-TW",
        rtc: {
            client: null,
            joined: false,
            published: false,
            localStream: null,
            remoteStreams: [],
            params: {}
        }
    },
    mutations: {
        setAppData (state, data) {
            state[data.key] = data.value
        }
    },
    actions: {

    }
}