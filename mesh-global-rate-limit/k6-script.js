import { sleep, check } from 'k6'
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
    stages: [
        { duration: '30s', target: 2 },
        { duration: '15s', target: 4 },
        { duration: '2m', target: 4 },
        { duration: '15s', target: 2 },
        { duration: '1m', target: 2 },
    ],
    ext: {
        loadimpact: {
            distribution: {
                'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
            },
        },
    },
}
export default function () {
    let res = null;
    let i = randomIntBetween(0, 1);
    if (i === 0) {
        res = http.get('http://35.202.42.119:8080/'); // Update with the IP of the gateway in zone1
        check(res, {
            "is-rate-limited-zone1": (r) => r.status === 423,
        })
    } else {
        res = http.get('http://34.133.78.102:8080/'); // Update with the IP of the gateway in zone2
        check(res, {
            "is-rate-limited-zone2": (r) => r.status === 423,
        })
    }

    sleep(1);
}

function randomIntBetween(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
