export default {
    data() {
        return {
            url: {
                cpu: `${this.baseUrl}/cpus`,
                cpuImg: `${this.baseUrl}/public/cpus`,
                cpuUploadImg: `${this.baseUrl}/cpus/upload`,

                mobo: `${this.baseUrl}/mobos`,
                moboImg: `${this.baseUrl}/public/mobos`,
                moboUploadImg: `${this.baseUrl}/mobos/upload`,

                gpu: `${this.baseUrl}/gpus`,
                gpuImg: `${this.baseUrl}/public/gpus`,
                gpuUploadImg: `${this.baseUrl}/gpus/upload`,
            },
        }
    }
}