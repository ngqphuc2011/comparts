export default {
    methods: {
        toTopPage() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0;
        },
        compareObjects(a, b) {
            return JSON.stringify(a) === JSON.stringify(b);
        }
    }
}