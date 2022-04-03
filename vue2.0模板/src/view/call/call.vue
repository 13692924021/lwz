<template>
    <div>
        <button @click="join">join</button>
        <button @click="leave">leave</button>
        <div id="local_stream" class="video-placeholder"></div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            // rtc: {
            //     client: null,
            //     joined: false,
            //     published: false,
            //     localStream: null,
            //     remoteStreams: [],
            //     params: {}
            // }
        }
    },
    computed: {
        // rtc: {
		// 	get () { return this.$store.state.app.rtc },
		// 	set (val) {
		// 		this.$store.commit("setAppData", {
        //             key: "rtc",
        //             value: val
        //         })
		// 	}
		// },
    },
    created () {
        window.rtc = {
            client: null,
            joined: false,
            published: false,
            localStream: null,
            remoteStreams: [],
            params: {}
        }
    },
    methods: {
        join () {
            let that = this
            let option = {
                mode: "live",
                codec: "h264",
                appID: "fafb587cdcf74493a342aafca3833295",
                channel: "123",
                uid: "",
                token: '006fafb587cdcf74493a342aafca3833295IABxXaiVIse5asBodAN1sQNhlCoD0B8AJ/WjTmYzrYmpNdJjSIgAAAAAEADC2ctrN5I8YQEAAQA3kjxh',
            }
            let AgoraRTC = this.AgoraRTC
            window.rtc.client = AgoraRTC.createClient({mode: option.mode, codec: option.codec})

            window.rtc.params = option
            window.rtc.client.init(option.appID, function () {
                console.log("init success",option)

                window.rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? +option.uid : null, function (uid) {
                that.$Message.success("join channel: " + option.channel + " success, uid: " + uid)
                console.log("join channel: " + option.channel + " success, uid: " + uid)

                window.rtc.params.uid = uid
                console.log('createStream 数据',{
                    streamID: window.rtc.params.uid,
                    audio: true,
                    video: true,
                    screen: false,
                    microphoneId: option.microphoneId,
                    cameraId: option.cameraId
                })
                // create local stream
                window.rtc.localStream = AgoraRTC.createStream({
                    streamID: window.rtc.params.uid,
                    audio: true,
                    video: true,
                    screen: false,
                    microphoneId: option.microphoneId,
                    cameraId: option.cameraId
                })

                // initialize local stream. Callback function executed after intitialization is done
                window.rtc.localStream.init(function () {
                    console.log("init local stream success")
                    // play stream with html element id "local_stream"
                    window.rtc.localStream.play("local_stream")

                    // publish local stream
                    // publish(window.rtc)
                }, function (err)  {
                    that.$Message.error("stream init failed, please open console see more detail")
                    console.error("init local stream failed ", err)
                })
                }, function(err) {
                that.$Message.error("client join failed, please open console see more detail")
                console.error("client join failed", err)
                })
            }, (err) => {
                that.$Message.error("client init failed, please open console see more detail")
                console.error(err)
            })


                    
        },
        leave () {
            let that =this
            window.rtc.client.leave(function () {
        // stop stream
                if(window.rtc.localStream.isPlaying()) {
                    window.rtc.localStream.stop()
                }
                // close stream
                window.rtc.localStream.close()
                
                window.rtc.localStream = null
                window.rtc.client = null
                console.log("client leaves channel success")
                window.rtc.published = false
                window.rtc.joined = false
            }, function (err) {
                console.log("channel leave failed")
                console.error(err)
            })
        }
    }
}
</script>

<style>
.video-placeholder {
    width: 300px;
    height: 250px;
    border: solid 1px;
}
button {
    padding: 20px;
}
</style>